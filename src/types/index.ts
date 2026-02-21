// src/types/index.ts
// =====================================================
// TIPOS GLOBALES DE TYPESCRIPT
// =====================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  imageUrl: string;
  images: string[];
  materials: string[];
  dimensions?: string | null;
  weight?: string | null;
  featured: boolean;
  active: boolean;
  stock: number;
  categoryId: string;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

// Para el catálogo público (datos serializados desde Prisma)
export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: string; // Decimal serializado como string
  imageUrl: string;
  materials: string[];
  dimensions?: string | null;
  featured: boolean;
  stock: number;
  categoryName: string;
  categorySlug: string;
}

export interface CategoryWithProducts extends Category {
  products: ProductCard[];
}

// WhatsApp
export interface WhatsAppMessageData {
  productName: string;
  price: string;
  imageUrl: string;
  productUrl?: string;
}
