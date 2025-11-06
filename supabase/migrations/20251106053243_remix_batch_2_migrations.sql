
-- Migration: 20251106050201

-- Migration: 20251106042853

-- Migration: 20251015133513
-- Create table for AI chat conversations
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chat messages
CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_conversations_created_at ON public.ai_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conversation ON public.ai_messages(conversation_id, created_at);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_ai_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.ai_conversations 
  SET updated_at = now() 
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_ai_conversation_timestamp_trigger ON public.ai_messages;
CREATE TRIGGER update_ai_conversation_timestamp_trigger
AFTER INSERT ON public.ai_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_ai_conversation_timestamp();

-- Migration: 20251015133536
-- Enable RLS on both tables
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

-- Everyone can read conversations (public access)
CREATE POLICY "Anyone can view conversations"
ON public.ai_conversations
FOR SELECT
USING (true);

-- Everyone can create conversations (public access)
CREATE POLICY "Anyone can create conversations"
ON public.ai_conversations
FOR INSERT
WITH CHECK (true);

-- Everyone can update conversations (public access)
CREATE POLICY "Anyone can update conversations"
ON public.ai_conversations
FOR UPDATE
USING (true);

-- Everyone can delete conversations (public access)
CREATE POLICY "Anyone can delete conversations"
ON public.ai_conversations
FOR DELETE
USING (true);

-- Everyone can read messages (public access)
CREATE POLICY "Anyone can view messages"
ON public.ai_messages
FOR SELECT
USING (true);

-- Everyone can create messages (public access)
CREATE POLICY "Anyone can create messages"
ON public.ai_messages
FOR INSERT
WITH CHECK (true);

-- Fix search_path for the trigger function
CREATE OR REPLACE FUNCTION public.update_ai_conversation_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.ai_conversations 
  SET updated_at = now() 
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

-- Migration: 20251106014258
-- Create hadith bookmarks table
CREATE TABLE IF NOT EXISTS public.hadith_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  hadith_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, hadith_id)
);

-- Enable RLS
ALTER TABLE public.hadith_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own hadith bookmarks"
  ON public.hadith_bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own hadith bookmarks"
  ON public.hadith_bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hadith bookmarks"
  ON public.hadith_bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);


-- Migration: 20251106044641
-- Drop tables if they exist (CASCADE to remove dependencies)
DROP TABLE IF EXISTS public.ai_messages CASCADE;
DROP TABLE IF EXISTS public.ai_conversations CASCADE;
DROP TABLE IF EXISTS public.hadith_bookmarks CASCADE;

-- Create hadith_bookmarks table
CREATE TABLE public.hadith_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hadith_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, hadith_id)
);

-- Enable RLS
ALTER TABLE public.hadith_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for hadith_bookmarks
CREATE POLICY "Users can view their own hadith bookmarks"
ON public.hadith_bookmarks
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own hadith bookmarks"
ON public.hadith_bookmarks
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own hadith bookmarks"
ON public.hadith_bookmarks
FOR DELETE
USING (user_id = auth.uid());

-- Create index for performance
CREATE INDEX idx_hadith_bookmarks_user_id ON public.hadith_bookmarks(user_id);

-- Create AI conversations table
CREATE TABLE public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_conversations
CREATE POLICY "Users can view their own ai conversations"
ON public.ai_conversations
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own ai conversations"
ON public.ai_conversations
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own ai conversations"
ON public.ai_conversations
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own ai conversations"
ON public.ai_conversations
FOR DELETE
USING (user_id = auth.uid());

-- Create AI messages table
CREATE TABLE public.ai_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_messages
CREATE POLICY "Users can view messages in their ai conversations"
ON public.ai_messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.ai_conversations
    WHERE ai_conversations.id = ai_messages.conversation_id
    AND ai_conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create messages in their ai conversations"
ON public.ai_messages
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.ai_conversations
    WHERE ai_conversations.id = ai_messages.conversation_id
    AND ai_conversations.user_id = auth.uid()
  )
);

-- Create indexes
CREATE INDEX idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX idx_ai_messages_conversation_id ON public.ai_messages(conversation_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_conversations_updated_at
BEFORE UPDATE ON public.ai_conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Migration: 20251106044655
-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


-- Migration: 20251106051852
-- Create hadith_bookmarks table if not exists
CREATE TABLE IF NOT EXISTS public.hadith_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hadith_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, hadith_id)
);

-- Enable RLS
ALTER TABLE public.hadith_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for hadith_bookmarks
DROP POLICY IF EXISTS "Users can view their own hadith bookmarks" ON public.hadith_bookmarks;
CREATE POLICY "Users can view their own hadith bookmarks" 
ON public.hadith_bookmarks 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own hadith bookmarks" ON public.hadith_bookmarks;
CREATE POLICY "Users can create their own hadith bookmarks" 
ON public.hadith_bookmarks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own hadith bookmarks" ON public.hadith_bookmarks;
CREATE POLICY "Users can delete their own hadith bookmarks" 
ON public.hadith_bookmarks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create ai_conversations table if not exists
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_conversations
DROP POLICY IF EXISTS "Users can view their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can view their own ai conversations" 
ON public.ai_conversations 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can create their own ai conversations" 
ON public.ai_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can update their own ai conversations" 
ON public.ai_conversations 
FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own ai conversations" ON public.ai_conversations;
CREATE POLICY "Users can delete their own ai conversations" 
ON public.ai_conversations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create ai_messages table if not exists
CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_messages
DROP POLICY IF EXISTS "Users can view messages in their ai conversations" ON public.ai_messages;
CREATE POLICY "Users can view messages in their ai conversations" 
ON public.ai_messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM ai_conversations 
  WHERE ai_conversations.id = ai_messages.conversation_id 
  AND ai_conversations.user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can create messages in their ai conversations" ON public.ai_messages;
CREATE POLICY "Users can create messages in their ai conversations" 
ON public.ai_messages 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM ai_conversations 
  WHERE ai_conversations.id = ai_messages.conversation_id 
  AND ai_conversations.user_id = auth.uid()
));

-- Create update trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for ai_conversations
DROP TRIGGER IF EXISTS update_ai_conversations_updated_at ON public.ai_conversations;
CREATE TRIGGER update_ai_conversations_updated_at
BEFORE UPDATE ON public.ai_conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for ai_messages to update conversation timestamp
CREATE OR REPLACE FUNCTION public.update_ai_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.ai_conversations 
  SET updated_at = now() 
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS update_conversation_on_message ON public.ai_messages;
CREATE TRIGGER update_conversation_on_message
AFTER INSERT ON public.ai_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_ai_conversation_timestamp();
