import fs from 'fs';
import path from 'path';
import { validateClientConfig } from './schemas/client-config.schema';
import { CLIENT_CONFIG as FALLBACK_CONFIG } from './client.config';
import type { ClientConfig } from './schemas/client-config.schema';

export type { ClientConfig };

// ═══════════════════════════════════════════════════════════════
// Config Loader — Zero-Defect + Performance-Optimized
// ═══════════════════════════════════════════════════════════════
// Singleton-Cache: Config wird nur 1x pro Prozess geladen
// Conditional Logging: Nur in Development, nicht in Production
// Memory-Cache: Kein File-I/O bei jedem Render

const CONFIGS_DIR = path.join(process.cwd(), 'configs');
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Singleton-Cache (Module-Level, nicht Class-basiert)
let cachedConfig: ClientConfig | null = null;
let cachedClientType: string | null = null;

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
 * Server-side Funktion (nur in Server Components / API Routes verwenden)
 *
 * Performance: Singleton-Cache (nur 1x laden pro Prozess)
 * Logging: Nur in Development (kein Production-Spam)
 */
export function getClientConfig(): ClientConfig {
  const clientType = process.env.CLIENT_TYPE || 'kiosk';

  // Cache-Hit: Gleicher Client-Type bereits geladen
  if (cachedConfig && cachedClientType === clientType) {
    return cachedConfig;
  }

  // Cache-Miss oder Client-Type geändert: Neu laden
  const configPath = path.join(CONFIGS_DIR, clientType + '.json');

  if (fs.existsSync(configPath)) {
    try {
      const rawConfig = fs.readFileSync(configPath, 'utf-8');
      const parsedConfig = JSON.parse(rawConfig);
      const validatedConfig = validateClientConfig(parsedConfig);

      log(`Loaded config from: configs/${clientType}.json`);

      // Cache aktualisieren
      cachedConfig = validatedConfig;
      cachedClientType = clientType;

      return validatedConfig;
    } catch (error) {
      logError(`Failed to load configs/${clientType}.json`, error);
      logError('Falling back to client.config.ts');

      const fallbackConfig = validateClientConfig(FALLBACK_CONFIG);
      cachedConfig = fallbackConfig;
      cachedClientType = clientType;

      return fallbackConfig;
    }
  } else {
    log(`No config file found at configs/${clientType}.json`);
    log('Using fallback: client.config.ts');

    const fallbackConfig = validateClientConfig(FALLBACK_CONFIG);
    cachedConfig = fallbackConfig;
    cachedClientType = clientType;

    return fallbackConfig;
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

/**
 * Helper: Cache invalidieren (für Tests oder Config-Reload)
 */
export function clearConfigCache(): void {
  cachedConfig = null;
  cachedClientType = null;
  log('Config cache cleared');
}
