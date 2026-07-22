import { NextResponse } from 'next/server';
import { get, update } from '@vercel/edge-config';

export async function POST() {
  try {
    const currentStatus = await get('emergencyMode');
    const newStatus = !currentStatus;
    await update({ emergencyMode: newStatus });
    return NextResponse.json({ success: true, emergencyMode: newStatus });
  } catch (error) {
    console.error('Edge Config POST Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Umschalten fehlgeschlagen' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const status = await get('emergencyMode');
    return NextResponse.json({ emergencyMode: status || false });
  } catch (error) {
    console.error('Edge Config GET Fehler:', error);
    return NextResponse.json({ emergencyMode: false });
  }
}
