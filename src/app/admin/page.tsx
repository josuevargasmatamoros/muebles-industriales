// src/app/admin/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Tag, TrendingUp, ExternalLink, LogOut } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [totalProducts, totalCategories, featuredProducts, lowStockCount] =
    await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.category.count(),
      prisma.product.count({ where: { featured: true, active: true } }),
      prisma.product.count({ where: { stock: { lte: 3 }, active: true } }),
    ]);

  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      {/* Header admin */}
      <header className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-[#e8e0d5]">PANEL ADMIN</h1>
            <p className="text-[#a89a8a] text-xs mt-0.5">
              Hola, {session.user?.name ?? "Administrador"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-[#a89a8a] hover:text-[#e8e0d5] font-display tracking-wider transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              VER CATÁLOGO
            </Link>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-2 text-xs text-[#a89a8a] hover:text-[#b85c2c] font-display tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              SALIR
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: Package,
              value: totalProducts,
              label: "Productos activos",
              color: "text-[#b85c2c]",
            },
            {
              icon: Tag,
              value: totalCategories,
              label: "Categorías",
              color: "text-[#c9a84c]",
            },
            {
              icon: TrendingUp,
              value: featuredProducts,
              label: "Destacados",
              color: "text-green-400",
            },
            {
              icon: Package,
              value: lowStockCount,
              label: "Stock bajo",
              color: "text-red-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1a1a1a] border border-[#2a2a2a] p-5"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <div className={`font-display text-3xl ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-[#a89a8a] text-xs font-display tracking-wide">
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Tabla de productos recientes */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a]">
          <div className="px-6 py-4 border-b border-[#2a2a2a]">
            <h2 className="font-display text-sm text-[#e8e0d5] tracking-widest">
              PRODUCTOS RECIENTES
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  {["Producto", "Categoría", "Precio", "Stock", "Estado"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left px-6 py-3 text-[10px] font-display text-[#a89a8a] tracking-widest"
                      >
                        {col.toUpperCase()}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#1a1a1a] hover:bg-[#2a2a2a]/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2a2a2a] flex-shrink-0" />
                        <span className="text-sm text-[#e8e0d5] font-display">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#a89a8a] font-display tracking-wide">
                      {product.category.name.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#c9a84c] font-display">
                      ${parseFloat(product.price.toString()).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#e8e0d5] font-display">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-display tracking-widest px-2 py-1 ${
                          product.active
                            ? "bg-green-950/50 text-green-400 border border-green-900/50"
                            : "bg-red-950/50 text-red-400 border border-red-900/50"
                        }`}
                      >
                        {product.active ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-[#2a2a2a]">
            <p className="text-xs text-[#4a4a4a] font-display tracking-wider">
              Para gestionar productos, edita{" "}
              <code className="text-[#b85c2c]">prisma/seed.ts</code> y ejecuta{" "}
              <code className="text-[#b85c2c]">npm run db:seed</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
