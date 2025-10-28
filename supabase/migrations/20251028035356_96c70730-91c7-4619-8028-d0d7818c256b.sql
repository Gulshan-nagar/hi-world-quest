-- Create calls table to track voice calls
CREATE TABLE public.calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  caller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  callee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on calls
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;

-- Policies for calls table
CREATE POLICY "Users can view their own calls"
  ON public.calls
  FOR SELECT
  USING (auth.uid() = caller_id OR auth.uid() = callee_id);

CREATE POLICY "Users can insert their own calls"
  ON public.calls
  FOR INSERT
  WITH CHECK (auth.uid() = caller_id);

CREATE POLICY "Users can update their own calls"
  ON public.calls
  FOR UPDATE
  USING (auth.uid() = caller_id OR auth.uid() = callee_id);

-- Create matchmaking queue table
CREATE TABLE public.matchmaking_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on matchmaking_queue
ALTER TABLE public.matchmaking_queue ENABLE ROW LEVEL SECURITY;

-- Policies for matchmaking_queue
CREATE POLICY "Users can view the queue"
  ON public.matchmaking_queue
  FOR SELECT
  USING (true);

CREATE POLICY "Users can add themselves to queue"
  ON public.matchmaking_queue
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove themselves from queue"
  ON public.matchmaking_queue
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create call signals table for WebRTC signaling
CREATE TABLE public.call_signals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  call_id UUID NOT NULL REFERENCES public.calls(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_type TEXT NOT NULL CHECK (signal_type IN ('offer', 'answer', 'ice-candidate')),
  signal_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on call_signals
ALTER TABLE public.call_signals ENABLE ROW LEVEL SECURITY;

-- Policies for call_signals
CREATE POLICY "Users can view signals for their calls"
  ON public.call_signals
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.calls
      WHERE calls.id = call_signals.call_id
      AND (calls.caller_id = auth.uid() OR calls.callee_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert signals for their calls"
  ON public.call_signals
  FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.calls
      WHERE calls.id = call_signals.call_id
      AND (calls.caller_id = auth.uid() OR calls.callee_id = auth.uid())
    )
  );

-- Enable realtime for matchmaking and signaling
ALTER PUBLICATION supabase_realtime ADD TABLE public.matchmaking_queue;
ALTER PUBLICATION supabase_realtime ADD TABLE public.calls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.call_signals;