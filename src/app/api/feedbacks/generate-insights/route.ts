import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '~aispire/external/supabase/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const userId = payload.record.to_user_id || payload.record.user_id;

    if (!userId) {
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 }
      );
    }

    const processId = uuidv4();
    const supabase = await createClient();

    // Create process record
    await supabase.from('insights_processes').insert({
      id: processId,
      user_id: userId,
      status: 'processing',
    });

    fetch(
      'https://asia-northeast1-aispire.cloudfunctions.net/processInsightsFunction',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processId, userId }),
      }
    );

    return NextResponse.json({
      success: true,
      status: 'processing',
      processed: processId,
    });
  } catch (error) {
    console.error('[CRON] Process feedback error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
