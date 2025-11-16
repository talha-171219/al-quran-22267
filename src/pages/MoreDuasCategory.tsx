import { useParams, Link } from "react-router-dom";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { duaCategories, allDuas } from "@/data/moreDuasData";
import DuaCard from "@/components/azkar/DuaCard";

const MoreDuasCategory = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = duaCategories.find((cat) => cat.slug === slug);
  const duas = category ? allDuas[category.id] : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopBar title="Category Not Found" showBack />
        <main className="max-w-lg mx-auto px-4 py-6">
          <div className="mb-4">
            <Link to="/more-duas" className="text-sm text-primary hover:underline">← Back to categories</Link>
          </div>
          <div className="text-center text-foreground/60">Category not found.</div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title={`Category: ${category.title}`} showBack />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4">
          <Link to="/more-duas" className="text-sm text-primary hover:underline">← Back to categories</Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">{category.title}</h1>
        <p className="text-center text-muted-foreground mb-8">মোট দু'আ - {duas.length} টি</p>

        {duas.length > 0 ? (
          <div>
            {duas.map((dua, index) => (
              <DuaCard key={dua.id} dua={dua} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-foreground/60 text-center">No duas found for this category.</div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MoreDuasCategory;
