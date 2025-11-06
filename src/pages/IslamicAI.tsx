import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { ChatSidebar, Conversation as ChatConversation } from "@/components/chat/ChatSidebar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const IslamicAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useCustomKey, setUseCustomKey] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loadingConvos, setLoadingConvos] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Get user ID
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    const savedUseCustom = localStorage.getItem("ai_use_custom_key");
    const savedApiKey = localStorage.getItem("ai_custom_key");
    if (savedUseCustom) setUseCustomKey(savedUseCustom === "true");
    if (savedApiKey) setCustomApiKey(savedApiKey);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveSettings = () => {
    localStorage.setItem("ai_use_custom_key", useCustomKey.toString());
    if (customApiKey) {
      localStorage.setItem("ai_custom_key", customApiKey);
    }
    setSettingsOpen(false);
    toast.success("সেটিংস সংরক্ষিত হয়েছে");
  };

  // Conversation helpers
  const loadConversations = async () => {
    try {
      setLoadingConvos(true);
      const { data, error } = await supabase
        .from("ai_conversations")
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      setConversations((data as any) || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingConvos(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const selectConversation = async (id: string) => {
    setCurrentId(id);
    try {
      const { data, error } = await supabase
        .from("ai_messages")
        .select("role, content")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      setMessages(((data as any) || []).map((m: any) => ({ role: m.role, content: m.content })));
    } catch (e) {
      console.error(e);
      toast.error("চ্যাট লোড করতে সমস্যা হয়েছে");
    }
  };

  const newChat = () => {
    setCurrentId(null);
    setMessages([]);
    setInput("");
  };

  const deleteConversation = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ai_conversations")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      // If deleting current conversation, start fresh
      if (id === currentId) {
        newChat();
      }
      
      // Reload conversations
      await loadConversations();
      toast.success("চ্যাট মুছে ফেলা হয়েছে");
    } catch (e) {
      console.error(e);
      toast.error("চ্যাট মুছতে সমস্যা হয়েছে");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (useCustomKey && !customApiKey) {
      toast.error("আপনার Gemini API Key দিন");
      setSettingsOpen(true);
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Ensure we have a conversation
    let convoId = currentId;
    try {
      if (!convoId) {
        const title = userMessage.content.trim().slice(0, 60) || "নতুন চ্যাট";
        const { data: convo, error: convoErr } = await supabase
          .from("ai_conversations")
          .insert({ title, user_id: userId })
          .select("id")
          .single();
        if (convoErr) throw convoErr;
        convoId = (convo as any).id as string;
        setCurrentId(convoId);
        // refresh sidebar
        await loadConversations();
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/islamic-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            useCustomKey,
            customApiKey: useCustomKey ? customApiKey : undefined,
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantMessage;
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      // Persist messages
      if (convoId) {
        await supabase.from("ai_messages").insert([
          { conversation_id: convoId, role: "user", content: userMessage.content },
          { conversation_id: convoId, role: "assistant", content: assistantMessage },
        ]);
        // Touch conversation updated_at and refresh list
        await supabase
          .from("ai_conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", convoId);
        await loadConversations();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("উত্তর পেতে সমস্যা হয়েছে");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar 
        title="ইসলামিক AI" 
        showBack
        action={
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI সেটিংস</DialogTitle>
                <DialogDescription>
                  আপনার নিজের Gemini API key ব্যবহার করুন অথবা Lovable AI ব্যবহার করুন (ফ্রি)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="custom-key">কাস্টম Gemini API Key</Label>
                  <Switch
                    id="custom-key"
                    checked={useCustomKey}
                    onCheckedChange={setUseCustomKey}
                  />
                </div>
                {useCustomKey && (
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="আপনার Gemini API key দিন"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        এখানে ক্লিক করে API key পান
                      </a>
                    </p>
                  </div>
                )}
              </div>
              <Button onClick={saveSettings}>সংরক্ষণ করুন</Button>
            </DialogContent>
          </Dialog>
        }
      />

      <main className="mx-auto px-4 md:px-4 py-6 h-[calc(100vh-180px)] flex gap-4 max-w-6xl">
        <ChatSidebar
          conversations={conversations}
          currentId={currentId}
          onSelect={selectConversation}
          onNew={newChat}
          onDelete={deleteConversation}
        />

        <section className="flex-1 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">ইসলামিক AI সহায়ক</h2>
                <p className="text-muted-foreground max-w-md">
                  ইসলাম সম্পর্কিত যেকোনো প্রশ্ন করুন। উত্তর কুরআন ও হাদিসের আলোকে দেওয়া হবে।
                </p>
              </div>
              <div className="grid gap-2 w-full max-w-md">
                {[
                  "নামাজের ফরজ কয়টি?",
                  "রমজানের ফজিলত কি?",
                  "জাকাত দেওয়ার নিয়ম কি?",
                ].map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    className="text-left justify-start"
                    onClick={() => setInput(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Card
                      className={`p-4 max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </Card>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <Card className="p-4 bg-muted">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          <div className="flex gap-2 pt-4">
            <Input
              placeholder="আপনার প্রশ্ন লিখুন..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={isLoading}
            />
            <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default IslamicAI;
