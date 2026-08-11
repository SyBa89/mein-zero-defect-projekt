import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation.server'); // FIX: ./ statt ../
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./instrumentation.edge');   // FIX: ./ statt ../
  }
}

export const onRequestError = Sentry.captureRequestError;