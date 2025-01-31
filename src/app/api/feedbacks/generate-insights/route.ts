import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '~aispire/external/supabase/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    console.log('[generate-insights] Starting insight generation');
    const payload = await req.json();
    const userId = payload.record.to_user_id || payload.record.user_id;

    if (!userId) {
      console.log('[generate-insights] No user ID provided');
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 }
      );
    }

    const processId = uuidv4();
    console.log(`[generate-insights] Generated process ID: ${processId}`);
    const supabase = await createClient();

    // Create process record
    console.log('[generate-insights] Creating process record');
    await supabase.from('insights_processes').insert({
      id: processId,
      user_id: userId,
      status: 'processing',
    });

    console.log('[generate-insights] Triggering cloud function');
    await fetch(
      'https://asia-northeast1-aispire.cloudfunctions.net/processInsightsFunction',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processId, userId }),
      }
    );

    console.log(
      '[generate-insights] Successfully initiated insight generation'
    );
    return NextResponse.json({
      success: true,
      status: 'processing',
      processed: processId,
    });
  } catch (error) {
    console.error('[generate-insights] Process feedback error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
