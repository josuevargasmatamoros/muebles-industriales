// src/app/page.tsx
// =====================================================
// PÁGINA PRINCIPAL - CATÁLOGO PÚBLICO
// =====================================================

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/catalog/HeroSection";
import CatalogClient from "@/components/catalog/CatalogClient";
import type { ProductCard } from "@/types";

// Revalidar cada hora (ISR)
export const revalidate = 3600;

async function getProducts(): Promise<ProductCard[]> {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: {
        category: { select: { name: true, slug: true } },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price.toString(),
      imageUrl: p.imageUrl,
      materials: p.materials,
      dimensions: p.dimensions,
      featured: p.featured,
      stock: p.stock,
      categoryName: p.category.name,
      categorySlug: p.category.slug,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: { where: { active: true } } } },
      },
      orderBy: { name: "asc" },
    });

    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      count: c._count.products,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Catálogo */}
      <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-16">
        {/* Header de sección */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#b85c2c]" />
            <span className="font-display text-xs text-[#b85c2c] tracking-[0.3em]">
              NUESTROS PRODUCTOS
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-[#e8e0d5]">
            CATÁLOGO
          </h2>
          <p className="text-[#a89a8a] text-sm mt-2">
            {products.length} productos disponibles
          </p>
        </div>

        {/* Catálogo interactivo */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] skeleton-shimmer" />
              ))}
            </div>
          }
        >
          <CatalogClient products={products} categories={categories} />
        </Suspense>

        {/* Mensaje si no hay productos */}
        {products.length === 0 && (
          <div className="text-center py-24">
            <p className="font-display text-[#4a4a4a] text-xl tracking-widest mb-3">
              CATÁLOGO EN CONSTRUCCIÓN
            </p>
            <p className="text-[#a89a8a] text-sm">
              Pronto tendremos nuestros productos disponibles.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
