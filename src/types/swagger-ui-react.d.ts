declare module 'swagger-ui-react' {
  import type { ComponentType } from 'react';

  export interface SwaggerUIProps {
    url?: string;
    spec?: object | string;
    docExpansion?: 'list' | 'full' | 'none';
    defaultModelsExpandDepth?: number;
    [key: string]: unknown;
  }

  const SwaggerUI: ComponentType<SwaggerUIProps>;
  export default SwaggerUI;
}