import fs from 'fs';
import path from 'path';
import { validateClientConfig } from './schemas/client-config.schema';
import { CLIENT_CONFIG as FALLBACK_CONFIG } from './client.config';
import type { ClientConfig } from './schemas/client-config.schema';

// Re-export type for external use
export type { ClientConfig };

// ═══════════════════════════════════════════════════════════════
// Config Loader — White-Label-fähige Config-Verwaltung
// ═══════════════════════════════════════════════════════════════
// Strategie:
// 1. Prüfe ob configs/{type}.json existiert
// 2. Wenn ja: Lade JSON und validiere mit Zod
// 3. Wenn nein oder invalid: Fallback auf client.config.ts
// 4. Immer helpful Error-Message

const CONFIGS_DIR = path.join(process.cwd(), 'configs');

/**
 * Lädt die Client-Config basierend auf CLIENT_TYPE ENV-Variable
 * Server-side Funktion (nur in Server Components / API Routes verwenden)
 */
export function getClientConfig(): ClientConfig {
  const clientType = process.env.CLIENT_TYPE || 'kiosk';
  const configPath = path.join(CONFIGS_DIR, clientType + '.json');

  // Prüfe ob JSON-Config existiert
  if (fs.existsSync(configPath)) {
    try {
      const rawConfig = fs.readFileSync(configPath, 'utf-8');
      const parsedConfig = JSON.parse(rawConfig);

      // Zod-Validation
      const validatedConfig = validateClientConfig(parsedConfig);

      console.log('Loaded config from: configs/' + clientType + '.json');
      return validatedConfig;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to load configs/' + clientType + '.json:', errorMessage);
      console.error('Falling back to client.config.ts');

      // Fallback auf alte Config (auch validieren!)
      return validateClientConfig(FALLBACK_CONFIG);
    }
  } else {
    console.log('No config file found at configs/' + clientType + '.json');
    console.log('Using fallback: client.config.ts');

    // Validiere auch die Fallback-Config
    return validateClientConfig(FALLBACK_CONFIG);
  }
}

/**
 * Helper: Prüft ob eine Config-Datei existiert
 */
export function configExists(clientType: string): boolean {
  const configPath = path.join(CONFIGS_DIR, clientType + '.json');
  return fs.existsSync(configPath);
}

/**
 * Helper: Listet alle verfügbaren Configs auf
 */
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

/**
 * Helper: Gibt die aktuelle Config-Type zurück
 */
export function getCurrentClientType(): string {
  return process.env.CLIENT_TYPE || 'kiosk';
}
