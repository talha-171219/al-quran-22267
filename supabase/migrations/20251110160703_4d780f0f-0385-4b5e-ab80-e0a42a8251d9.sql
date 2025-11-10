-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can create their own ai conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can view their own ai conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can update their own ai conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can delete their own ai conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can create messages in their ai conversations" ON public.ai_messages;
DROP POLICY IF EXISTS "Users can view messages in their ai conversations" ON public.ai_messages;

-- Create new policies with explicit anonymous support
-- Allow anyone (authenticated or anonymous) to INSERT conversations
CREATE POLICY "Anyone can create ai conversations" 
ON public.ai_conversations 
FOR INSERT 
WITH CHECK (true);

-- Allow access based on user_id matching or both being null (anonymous)
CREATE POLICY "Users can view their ai conversations" 
ON public.ai_conversations 
FOR SELECT 
USING (
  (auth.uid() IS NULL AND user_id IS NULL) 
  OR (auth.uid() = user_id)
);

CREATE POLICY "Users can update their ai conversations" 
ON public.ai_conversations 
FOR UPDATE 
USING (
  (auth.uid() IS NULL AND user_id IS NULL) 
  OR (auth.uid() = user_id)
);

CREATE POLICY "Users can delete their ai conversations" 
ON public.ai_conversations 
FOR DELETE 
USING (
  (auth.uid() IS NULL AND user_id IS NULL) 
  OR (auth.uid() = user_id)
);

-- Allow anyone to insert messages
CREATE POLICY "Anyone can create ai messages" 
ON public.ai_messages 
FOR INSERT 
WITH CHECK (true);

-- Allow viewing messages if user owns the conversation or it's anonymous
CREATE POLICY "Users can view their ai messages" 
ON public.ai_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM ai_conversations 
    WHERE ai_conversations.id = ai_messages.conversation_id 
    AND (
      (auth.uid() IS NULL AND ai_conversations.user_id IS NULL)
      OR (auth.uid() = ai_conversations.user_id)
    )
  )
);