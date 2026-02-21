// src/components/catalog/CategorySection.tsx
import { ChefHat, Sofa, Bed } from "lucide-react";
import ProductCard from "./ProductCard";
import type { ProductCard as ProductCardType } from "@/types";

// Mapa de íconos de categorías
const categoryIcons: Record<string, React.ReactNode> = {
  cocina: <ChefHat className="w-5 h-5" />,
  sala: <Sofa className="w-5 h-5" />,
  cuarto: <Bed className="w-5 h-5" />,
};

interface CategorySectionProps {
  name: string;
  slug: string;
  description?: string | null;
  products: ProductCardType[];
}

export default function CategorySection({
  name,
  slug,
  description,
  products,
}: CategorySectionProps) {
  if (products.length === 0) return null;

  return (
    <section id={slug} className="mb-20 scroll-mt-24">
      {/* Header de categoría */}
      <div className="flex items-start gap-4 mb-10">
        {/* Ícono */}
        <div className="flex-shrink-0 w-12 h-12 bg-[#b85c2c]/10 border border-[#b85c2c]/30 flex items-center justify-center text-[#b85c2c]">
          {categoryIcons[slug] ?? null}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl lg:text-4xl text-[#e8e0d5]">
              {name}
            </h2>
            <span className="text-sm text-[#b85c2c] font-display tracking-widest">
              {products.length} {products.length === 1 ? "PRODUCTO" : "PRODUCTOS"}
            </span>
          </div>
          {description && (
            <p className="text-[#a89a8a] text-sm mt-1">{description}</p>
          )}
          {/* Línea decorativa */}
          <div className="mt-3 h-px bg-gradient-to-r from-[#b85c2c] via-[#b85c2c]/20 to-transparent w-full" />
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </section>
  );
}
