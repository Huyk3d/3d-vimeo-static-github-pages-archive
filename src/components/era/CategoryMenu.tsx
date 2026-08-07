export function CategoryMenu({ categories, activeCategory, onSelect }: { categories: string[]; activeCategory?: string; onSelect: (category: string) => void }) {
  return (
    <nav aria-label="Project categories" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
      {categories.map((category) => (
        <button key={category} type="button" onClick={() => onSelect(category)} className={activeCategory === category ? "font-bold" : "text-archive-muted hover:text-archive-text"}>
          {category}
        </button>
      ))}
    </nav>
  );
}
