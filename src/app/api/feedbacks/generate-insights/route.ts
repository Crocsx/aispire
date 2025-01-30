import { Client } from '@upstash/qstash';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { createClient } from '~aispire/external/supabase/server';

const client = new Client({ token: process.env.QSTASH_TOKEN! });

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

    // Get the base URL correctly in Next.js 15
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    // Queue the background job
    await client.publishJSON({
      url: `${baseUrl}/api/feedbacks/process-insights`,
      body: {
        processId,
        userId,
      },
      retries: 3,
    });

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
