import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RotateCcw, Info } from "lucide-react";
import { hajjData } from "@/data/hajj";
import { getChecklistState, toggleChecklistItem, getCheckedItemsCount, resetChecklist } from "@/utils/hajjStorage";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const categoryIcons = {
  documents: "📄",
  clothing: "👔",
  health: "💊",
  essentials: "🎒",
  electronics: "🔌"
};

const categoryNames = {
  documents: "কাগজপত্র",
  clothing: "পোশাক",
  health: "স্বাস্থ্য",
  essentials: "প্রয়োজনীয়",
  electronics: "ইলেকট্রনিক্স"
};

export const HajjChecklist = () => {
  const [checklistState, setChecklistState] = useState(getChecklistState());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const checkedCount = getCheckedItemsCount();
  const totalCount = hajjData.checklist.length;
  const progress = (checkedCount / totalCount) * 100;

  const handleToggle = (itemId: string, checked: boolean) => {
    toggleChecklistItem(itemId, checked);
    setChecklistState(getChecklistState());
  };

  const handleReset = () => {
    if (confirm('আপনি কি নিশ্চিত যে চেকলিস্ট রিসেট করতে চান?')) {
      resetChecklist();
      setChecklistState({});
      toast.success('চেকলিস্ট রিসেট করা হয়েছে');
    }
  };

  const handleDownload = () => {
    const content = hajjData.checklist
      .map(item => `${checklistState[item.id]?.checked ? '✓' : '☐'} ${item.title_bn} - ${item.note_bn}`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hajj-checklist.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('চেকলিস্ট ডাউনলোড করা হয়েছে');
  };

  const categories = ['all', ...Array.from(new Set(hajjData.checklist.map(item => item.category)))];
  const filteredItems = selectedCategory === 'all' 
    ? hajjData.checklist 
    : hajjData.checklist.filter(item => item.category === selectedCategory);

  const getCategoryProgress = (category: string) => {
    const items = hajjData.checklist.filter(item => item.category === category);
    const checked = items.filter(item => checklistState[item.id]?.checked).length;
    return items.length > 0 ? (checked / items.length) * 100 : 0;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">হজের চেকলিস্ট</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {checkedCount} / {totalCount} সম্পন্ন
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                ডাউনলোড
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                রিসেট
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full flex-wrap h-auto gap-2 bg-muted/50 p-2">
          <TabsTrigger value="all" className="flex-1 min-w-[100px]">
            সব ({totalCount})
          </TabsTrigger>
          {categories.slice(1).map(category => (
            <TabsTrigger key={category} value={category} className="flex-1 min-w-[100px] gap-1">
              <span>{categoryIcons[category as keyof typeof categoryIcons]}</span>
              <span className="hidden sm:inline">{categoryNames[category as keyof typeof categoryNames]}</span>
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {hajjData.checklist.filter(item => item.category === category && checklistState[item.id]?.checked).length}/
                {hajjData.checklist.filter(item => item.category === category).length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-2 mt-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`p-4 transition-all duration-200 ${
                checklistState[item.id]?.checked
                  ? 'bg-primary/5 border-primary/30'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={item.id}
                  checked={checklistState[item.id]?.checked || false}
                  onCheckedChange={(checked) => handleToggle(item.id, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <label
                    htmlFor={item.id}
                    className={`font-medium cursor-pointer transition-all ${
                      checklistState[item.id]?.checked
                        ? 'line-through text-muted-foreground'
                        : 'text-foreground'
                    }`}
                  >
                    {item.title_bn}
                  </label>
                  <p className="text-sm text-muted-foreground">{item.note_bn}</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{item.note_bn}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
