// src/components/catalog/CategoryFilter.tsx
"use client";

import { ChefHat, Sofa, Bed, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ReactNode> = {
  todos: <LayoutGrid className="w-4 h-4" />,
  cocina: <ChefHat className="w-4 h-4" />,
  sala: <Sofa className="w-4 h-4" />,
  cuarto: <Bed className="w-4 h-4" />,
};

interface FilterOption {
  slug: string;
  name: string;
  count: number;
}

interface CategoryFilterProps {
  options: FilterOption[];
  active: string;
  onChange: (slug: string) => void;
}

export default function CategoryFilter({
  options,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <button
        onClick={() => onChange("todos")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 font-display text-xs tracking-widest border transition-all duration-200",
          active === "todos"
            ? "bg-[#b85c2c] border-[#b85c2c] text-white"
            : "bg-transparent border-[#2a2a2a] text-[#a89a8a] hover:border-[#b85c2c]/50 hover:text-[#e8e0d5]"
        )}
      >
        {icons["todos"]}
        TODOS
      </button>
      {options.map((opt) => (
        <button
          key={opt.slug}
          onClick={() => onChange(opt.slug)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 font-display text-xs tracking-widest border transition-all duration-200",
            active === opt.slug
              ? "bg-[#b85c2c] border-[#b85c2c] text-white"
              : "bg-transparent border-[#2a2a2a] text-[#a89a8a] hover:border-[#b85c2c]/50 hover:text-[#e8e0d5]"
          )}
        >
          {icons[opt.slug] ?? null}
          {opt.name.toUpperCase()}
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-none font-display",
              active === opt.slug
                ? "bg-white/20 text-white"
                : "bg-[#2a2a2a] text-[#a89a8a]"
            )}
          >
            {opt.count}
          </span>
        </button>
      ))}
    </div>
  );
}
