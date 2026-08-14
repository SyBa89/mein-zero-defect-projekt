// src/app/api/docs/route.ts
// ✅ ZERO-DEFECT: Swagger YAML Endpoint mit Caching + Async-IO
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Module-Level Cache (einmal lesen, dann im Memory)
let cachedSpec: string | null = null;

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 Stunde Cache

export async function GET() {
  try {
    // Cache-Check: wenn bereits geladen, direkt zurückgeben
    if (cachedSpec) {
      return new NextResponse(cachedSpec, {
        status: 200,
        headers: {
          'Content-Type': 'text/yaml',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }

    // Async File-Read (non-blocking, besser für Serverless)
    const specPath = join(process.cwd(), 'src/docs/swagger.yaml');
    cachedSpec = await readFile(specPath, 'utf-8');

    return new NextResponse(cachedSpec, {
      status: 200,
      headers: {
        'Content-Type': 'text/yaml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    // Spezifisches Error-Handling
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[docs/route] Failed to load swagger.yaml:', message);

    return NextResponse.json(
      {
        error: 'Failed to load API specification',
        details: process.env.NODE_ENV === 'development' ? message : undefined,
      },
      { status: 500 }
    );
  }
}