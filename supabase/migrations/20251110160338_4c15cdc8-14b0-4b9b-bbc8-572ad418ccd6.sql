-- Make user_id nullable to support anonymous AI chat usage
ALTER TABLE public.ai_conversations ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing duplicate policies
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can delete their own conversations" ON public.ai_conversations;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.ai_messages;
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.ai_messages;

-- Update policies to allow anonymous usage (user_id IS NULL) or authenticated usage
DROP POLICY IF EXISTS "Users can create their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can create their own ai conversations" 
ON public.ai_conversations 
FOR INSERT 
WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can view their own ai conversations" 
ON public.ai_conversations 
FOR SELECT 
USING (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can update their own ai conversations" 
ON public.ai_conversations 
FOR UPDATE 
USING (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can delete their own ai conversations" 
ON public.ai_conversations 
FOR DELETE 
USING (user_id IS NULL OR auth.uid() = user_id);

-- Update message policies
DROP POLICY IF EXISTS "Users can create messages in their ai conversations" ON public.ai_messages;
CREATE POLICY "Users can create messages in their ai conversations" 
ON public.ai_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM ai_conversations 
    WHERE ai_conversations.id = ai_messages.conversation_id 
    AND (ai_conversations.user_id IS NULL OR ai_conversations.user_id = auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can view messages in their ai conversations" ON public.ai_messages;
CREATE POLICY "Users can view messages in their ai conversations" 
ON public.ai_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM ai_conversations 
    WHERE ai_conversations.id = ai_messages.conversation_id 
    AND (ai_conversations.user_id IS NULL OR ai_conversations.user_id = auth.uid())
  )
);