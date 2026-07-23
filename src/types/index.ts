// src/types/index.ts
export * from './config';
export * from './api';
export * from './components';

// src/types/config.ts
export interface SiteConfig {
  isClosed: boolean;
  bannerText: string;
  emergencyMessage: string;
  updatedAt: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  isClosed: false,
  bannerText: '',
  emergencyMessage: '',
  updatedAt: new Date().toISOString(),
};

// src/types/api.ts
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ConfigResponse extends ApiResponse {
  config?: SiteConfig;
}