import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
import { NextResponse } from 'next/server';

import { processInsights } from './process-feedback.action';

export const POST = verifySignatureAppRouter(async (req: Request) => {
  try {
    const body = await req.json();
    const { processId, userId } = body;

    await processInsights(processId, userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Queue] Process insights error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
});
