import { createClient } from '~aispire/external/supabase';

export type ProcessStatus = 'processing' | 'completed' | 'failed';

export interface Process {
  id: string;
  user_id: string;
  status: ProcessStatus;
  error?: string;
  created_at?: string;
}

export const subscribeToProcess = (
  userId: string,
  callback: (process: Process) => void
) => {
  const supabase = createClient();

  // Subscribe to inserts and updates
  const subscription = supabase
    .channel('insight-process-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'insights_processes',
        filter: `user_id=eq.${userId}`,
      },
      (payload: Process) => {
        callback(payload);
      }
    )
    .subscribe();

  // Return cleanup function
  return () => {
    subscription.unsubscribe();
  };
};
