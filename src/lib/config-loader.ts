import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { validateClientConfig } from './schemas/client-config.schema';
import { CLIENT_CONFIG as FALLBACK_CONFIG } from './client.config';
import type { ClientConfig } from './schemas/client-config.schema';

export type { ClientConfig };

const CONFIGS_DIR = path.join(process.cwd(), 'configs');
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

function log(message: string): void {
  if (IS_DEVELOPMENT) {
    console.log(`[ConfigLoader] ${message}`);
  }
}

function logError(message: string, error?: unknown): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`[ConfigLoader] ${message}: ${errorMessage}`);
}

/**
 * Lädt die Client-Config basierend auf CLIENT_TYPE ENV-Variable
 *
 * ZERO-DEFECT: React cache() garantiert 1 Aufruf pro Request
 * - Server Components: Request-scoped memoization
 * - Serverless-compatible: Funktioniert auf Vercel
 * - Performance: Nur 1 File-Read pro Request
 * - Type-safe: Zod validation included
 */
export const getClientConfig = cache((): ClientConfig => {
  const clientType = process.env.CLIENT_TYPE || 'kiosk';
  const configPath = path.join(CONFIGS_DIR, clientType + '.json');

  if (fs.existsSync(configPath)) {
    try {
      const rawConfig = fs.readFileSync(configPath, 'utf-8');
      const parsedConfig = JSON.parse(rawConfig);
      const validatedConfig = validateClientConfig(parsedConfig);

      log(`Loaded config from: configs/${clientType}.json`);
      return validatedConfig;
    } catch (error) {
      logError(`Failed to load configs/${clientType}.json`, error);
      logError('Falling back to client.config.ts');
      return validateClientConfig(FALLBACK_CONFIG);
    }
  } else {
    log(`No config file found at configs/${clientType}.json`);
    log('Using fallback: client.config.ts');
    return validateClientConfig(FALLBACK_CONFIG);
  }
});

export function configExists(clientType: string): boolean {
  const configPath = path.join(CONFIGS_DIR, clientType + '.json');
  return fs.existsSync(configPath);
}

export function listAvailableConfigs(): string[] {
  if (!fs.existsSync(CONFIGS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONFIGS_DIR)
    .filter(function (file: string) {
      return file.endsWith('.json');
    })
    .map(function (file: string) {
      return file.replace('.json', '');
    });
}

export function getCurrentClientType(): string {
  return process.env.CLIENT_TYPE || 'kiosk';
}
