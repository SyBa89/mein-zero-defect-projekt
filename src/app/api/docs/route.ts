import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const spec = readFileSync(join(process.cwd(), 'src/docs/swagger.yaml'), 'utf-8');
    return new NextResponse(spec, {
      status: 200,
      headers: {
        'Content-Type': 'text/yaml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load API spec' }, { status: 500 });
  }
}