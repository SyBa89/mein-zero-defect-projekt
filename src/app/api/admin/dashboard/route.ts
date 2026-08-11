// src/app/api/admin/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/db/redis';
import { verifySessionToken, hasPermission } from '@/lib/auth';
import { CURRENT_DOMAIN } from '@/lib/config/domain';

// 🚨 ZWINGEND: Verhindert die Next.js Caching-Falle (Der Hauptgrund für alte Daten!)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export async function GET(request: NextRequest) {
  try {
    // 🔒 ZERO-DEFECT SECURITY: Einheitlicher Session-Check (Keine Header-Passwörter mehr!)
    const token = request.cookies.get('session')?.value;
    const sessionUser = token ? verifySessionToken(token) : null;

    if (!sessionUser || !hasPermission(sessionUser.role, 'view-dashboard')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ 
        error: 'Database offline', 
        systemStatus: 'offline' 
      }, { status: 503 });
    }

    const today = new Date().toISOString().split('T')[0];
    
    // 🌍 WHITE-LABEL: Nutzt dynamisch die Keys der aktuellen Domain (Kiosk/Handwerker/Arzt)
    const revenueKey = CURRENT_DOMAIN.redisKeys.dailyRevenue(today);
    const tasksKey = CURRENT_DOMAIN.redisKeys.tasks;
    const contactsKey = CURRENT_DOMAIN.redisKeys.contacts;

    const [revenue, checklist, contacts] = await Promise.all([
      redis.get<number>(revenueKey),
      redis.get<ChecklistItem[]>(tasksKey),
      redis.get<unknown[]>(contactsKey)
    ]);

    const openTasks = (checklist || []).filter((item) => !item.done).length;

    return NextResponse.json({
      domain: CURRENT_DOMAIN.id,
      today,
      revenue: revenue || 0,
      openTasks,
      totalContacts: (contacts || []).length,
      systemStatus: 'healthy',
      lastUpdate: new Date().toISOString()
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[Dashboard API] Critical Error:`, message);
    return NextResponse.json({ 
      error: 'Failed to load dashboard', 
      systemStatus: 'degraded' 
    }, { status: 500 });
  }
}