// src/app/api/products/route.ts
// =====================================================
// API ROUTE - LISTADO DE PRODUCTOS
// =====================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const featured = searchParams.get("featured");

    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(categorySlug && categorySlug !== "todos"
          ? { category: { slug: categorySlug } }
          : {}),
        ...(featured === "true" ? { featured: true } : {}),
      },
      include: {
        category: {
          select: { name: true, slug: true },
        },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    // Serializar Decimal a string para JSON
    const serialized = products.map((p) => ({
      ...p,
      price: p.price.toString(),
    }));

    return NextResponse.json({ products: serialized });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
