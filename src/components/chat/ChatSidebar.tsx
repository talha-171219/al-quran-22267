import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquarePlus, Trash2, Menu } from "lucide-react";
import { useState } from "react";

export type Conversation = {
  id: string;
  title: string;
  updated_at: string;
};

interface ChatSidebarProps {
  conversations: Conversation[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete?: (id: string) => void;
}

// Helper to group conversations by date
const groupConversations = (conversations: Conversation[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const groups: Record<string, Conversation[]> = {
    আজ: [],
    গতকাল: [],
    "গত ৭ দিন": [],
    "গত ৩০ দিন": [],
    পুরাতন: [],
  };

  conversations.forEach((conv) => {
    const date = new Date(conv.updated_at);
    if (date >= today) {
      groups["আজ"].push(conv);
    } else if (date >= yesterday) {
      groups["গতকাল"].push(conv);
    } else if (date >= sevenDaysAgo) {
      groups["গত ৭ দিন"].push(conv);
    } else if (date >= thirtyDaysAgo) {
      groups["গত ৩০ দিন"].push(conv);
    } else {
      groups["পুরাতন"].push(conv);
    }
  });

  return groups;
};

const SidebarContent = ({ 
  conversations, 
  currentId, 
  onSelect, 
  onNew, 
  onDelete,
  onClose 
}: ChatSidebarProps & { onClose?: () => void }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const grouped = groupConversations(conversations);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onDelete) onDelete(id);
  };

  return (
    <div className="flex flex-col h-full bg-card/50">
      <div className="p-3 border-b">
        <Button onClick={() => { onNew(); onClose?.(); }} className="w-full gap-2">
          <MessageSquarePlus className="h-4 w-4" />
          নতুন চ্যাট
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {conversations.length === 0 ? (
            <p className="text-sm text-muted-foreground p-3 text-center">
              কোনো চ্যাট পাওয়া যায়নি
            </p>
          ) : (
            Object.entries(grouped).map(([label, convos]) => {
              if (convos.length === 0) return null;
              return (
                <div key={label}>
                  <h3 className="text-xs font-semibold text-muted-foreground px-3 py-2">
                    {label}
                  </h3>
                  <div className="space-y-1">
                    {convos.map((c) => (
                      <div
                        key={c.id}
                        className="relative group"
                        onMouseEnter={() => setHoveredId(c.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <button
                          onClick={() => { onSelect(c.id); onClose?.(); }}
                          className={`w-full text-left px-3 py-2 pr-10 rounded-md transition-colors ${
                            currentId === c.id
                              ? "bg-muted text-foreground"
                              : "hover:bg-muted/60"
                          }`}
                          title={c.title}
                        >
                          <div className="line-clamp-2 text-sm">{c.title}</div>
                        </button>
                        
                        {(hoveredId === c.id || currentId === c.id) && onDelete && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleDelete(e, c.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export const ChatSidebar = (props: ChatSidebarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent {...props} onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 flex-col border-r">
        <SidebarContent {...props} />
      </aside>
    </>
  );
};
