import { NextResponse } from 'next/server';

import { processUserFeedback } from './process-feedback.action';

// Modern way to configure route segment
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes timeout

export async function POST(req: Request) {
  try {
    // const webhookSecret = req.headers.get('webhook-secret');
    // if (webhookSecret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const payload = await req.json();
    const userId = payload.record.to_user_id || payload.record.user_id;

    if (!userId) {
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 }
      );
    }

    const { processId, status } = await processUserFeedback(userId);

    return NextResponse.json({
      success: true,
      status,
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
