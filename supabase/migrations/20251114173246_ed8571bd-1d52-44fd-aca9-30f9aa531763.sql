-- Enable RLS on prayer_notifications_log table
ALTER TABLE public.prayer_notifications_log ENABLE ROW LEVEL SECURITY;

-- Create policies for prayer_notifications_log (read-only for everyone, insert only for system)
CREATE POLICY "Anyone can view prayer notifications log" 
ON public.prayer_notifications_log 
FOR SELECT 
USING (true);

-- System only can insert (no user-facing inserts needed)
CREATE POLICY "System can insert prayer notifications log" 
ON public.prayer_notifications_log 
FOR INSERT 
WITH CHECK (false);