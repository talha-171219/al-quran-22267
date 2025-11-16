import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Link } from "react-router-dom";
import { duaCategories } from "@/data/moreDuasData";

const MoreDuas = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="More Duas • আরও দুআ" showBack />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">দু'আর বিষয়াদি</h1>
        <p className="text-center text-muted-foreground mb-8">মোট বিষয় - {duaCategories.length} টি</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {duaCategories.map((category) => (
            <Link
              key={category.id}
              to={`/more-duas/${category.slug}`}
              className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card text-card-foreground text-center"
            >
              <img src={category.thumbnail} alt={category.title} className="w-24 h-24 object-contain mb-4" />
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-sm text-muted-foreground">মোট দু'আ: {category.duaCount} টি</p>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default MoreDuas;
