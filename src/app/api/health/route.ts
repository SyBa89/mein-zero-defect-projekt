import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET() {
  const redisUrl = process.env.KV_REST_API_URL;
  const redisToken = process.env.KV_REST_API_TOKEN;

  // ✅ GOLDSTANDARD: Defensive Prüfung fehlender Konfiguration
  if (!redisUrl || !redisToken) {
    return NextResponse.json(
      {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        services: { redis: 'not_configured', api: 'operational' },
      },
      { status: 503 }
    );
  }

  try {
    const redis = new Redis({ url: redisUrl, token: redisToken });

    // Aktiver Ping zur Datenbank
    await redis.ping();

    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: { redis: 'connected', api: 'operational' },
      },
      { status: 200 }
    );
  } catch (error) {
    // Graceful Degradation: Server läuft, aber DB ist nicht erreichbar
    return NextResponse.json(
      {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        services: { redis: 'disconnected', api: 'operational' },
      },
      { status: 503 }
    );
  }
}
