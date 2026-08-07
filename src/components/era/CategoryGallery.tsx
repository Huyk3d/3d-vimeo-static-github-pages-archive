"use client";

import { useState } from "react";
import type { Era } from "@/types/archive";
import { HorizontalGallery } from "@/components/project/HorizontalGallery";
import { CategoryMenu } from "./CategoryMenu";

export function CategoryGallery({ era }: { era: Era }) {
  const categories = era.categories ?? [];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const projects = era.projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <CategoryMenu categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
      <div className="mt-10"><HorizontalGallery eraSlug={era.slug} projects={projects} /></div>
    </>
  );
}
