// src/components/catalog/CatalogClient.tsx
"use client";

import { useState, useMemo } from "react";
import CategoryFilter from "./CategoryFilter";
import CategorySection from "./CategorySection";
import ProductCard from "./ProductCard";
import type { ProductCard as ProductCardType } from "@/types";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  count: number;
}

interface CatalogClientProps {
  products: ProductCardType[];
  categories: CategoryData[];
}

export default function CatalogClient({
  products,
  categories,
}: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState("todos");

  // Filtrar productos por categoría seleccionada
  const filteredProducts = useMemo(() => {
    if (activeCategory === "todos") return products;
    return products.filter((p) => p.categorySlug === activeCategory);
  }, [products, activeCategory]);

  // Cuando se filtra, mostrar grid plano; cuando es "todos", mostrar por secciones
  const showSections = activeCategory === "todos";

  return (
    <div>
      {/* Barra de filtros */}
      <CategoryFilter
        options={categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          count: c.count,
        }))}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {showSections ? (
        // Vista por categorías completas
        categories.map((cat) => {
          const catProducts = products.filter(
            (p) => p.categorySlug === cat.slug
          );
          return (
            <CategorySection
              key={cat.id}
              name={cat.name}
              slug={cat.slug}
              description={cat.description}
              products={catProducts}
            />
          );
        })
      ) : (
        // Vista filtrada - grid plano
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="font-display text-[#4a4a4a] text-lg tracking-widest">
                NO HAY PRODUCTOS EN ESTA CATEGORÍA
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
