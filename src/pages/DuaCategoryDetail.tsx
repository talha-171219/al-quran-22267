import { useParams } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { duaCategories, allDuas, DuaItem } from "@/data/moreDuasData";

const DuaCategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = duaCategories.find((cat) => cat.slug === slug);
  const duas: DuaItem[] | undefined = category ? allDuas[category.id] : undefined;

  if (!category) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="Category Not Found" showBack />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Category Not Found</h1>
          <p className="text-center text-muted-foreground">The requested dua category could not be found.</p>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title={category.title} showBack />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">{category.title}</h1>
        <p className="text-center text-muted-foreground mb-8">মোট দু'আ: {category.duaCount} টি</p>

        {!duas || duas.length === 0 ? (
          <p className="text-center text-muted-foreground">কোনো দুআ পাওয়া যায়নি। No duas found for this category.</p>
        ) : (
          <div className="space-y-6">
            {duas.map((dua, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm bg-card text-card-foreground">
                <p className="text-right text-2xl font-arabic mb-2" dir="rtl">{dua.arabic}</p>
                {dua.bengaliTranslation && <p className="text-base mb-1">{dua.bengaliTranslation}</p>}
                {/* Add other fields as they are populated in DuaItem */}
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default DuaCategoryDetail;
