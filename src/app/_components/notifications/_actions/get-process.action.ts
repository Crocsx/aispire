import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

import { createClient } from '~aispire/external/supabase';

export type ProcessStatus = 'processing' | 'completed' | 'failed';

export interface Process {
  id: string;
  user_id: string;
  status: ProcessStatus;
  error?: string;
  created_at?: string;
}

export const getProcesses = async (userId: string) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('insights_processes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return data as Process[];
};

export const subscribeToProcess = (
  userId: string,
  callback: (process: Process) => void
) => {
  const supabase = createClient();

  // Get initial data
  getProcesses(userId).then((processes) => {
    processes.forEach(callback);
  });

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
      (payload: RealtimePostgresChangesPayload<Process>) => {
        callback(payload.new as Process);
      }
    )
    .subscribe();

  // Return cleanup function
  return () => {
    subscription.unsubscribe();
  };
};
