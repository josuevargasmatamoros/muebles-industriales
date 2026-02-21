// src/components/catalog/ProductCard.tsx
"use client";

import Image from "next/image";
import { MessageCircle, Package, Star } from "lucide-react";
import { generateWhatsAppUrl, formatPrice } from "@/lib/whatsapp";
import type { ProductCard as ProductCardType } from "@/types";

interface ProductCardProps {
  product: ProductCardType;
  index?: number; // Para animaciones escalonadas
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const animationDelay = `${index * 80}ms`;

  const handleWhatsApp = () => {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "";
    const url = generateWhatsAppUrl({
      productName: product.name,
      price: product.price,
      imageUrl: product.imageUrl.startsWith("http")
        ? product.imageUrl
        : `${baseUrl}${product.imageUrl}`,
      productUrl: `${baseUrl}/catalogo/${product.slug}`,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isOutOfStock = product.stock === 0;

  return (
    <article
      className="group relative bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#b85c2c]/40 transition-all duration-500 card-shadow hover:card-shadow-hover animate-fade-in-up flex flex-col"
      style={{ animationDelay, animationFillMode: "both", opacity: 0 }}
    >
      {/* Badge destacado */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[#c9a84c] text-[#0e0e0e] text-[10px] font-display tracking-widest px-2.5 py-1">
          <Star className="w-2.5 h-2.5" fill="currentColor" />
          DESTACADO
        </div>
      )}

      {/* Badge stock */}
      {isLowStock && (
        <div className="absolute top-3 right-3 z-10 bg-[#b85c2c] text-white text-[10px] font-display tracking-widest px-2.5 py-1">
          ÚLTIMAS {product.stock}
        </div>
      )}
      {isOutOfStock && (
        <div className="absolute top-3 right-3 z-10 bg-[#2a2a2a] text-[#a89a8a] text-[10px] font-display tracking-widest px-2.5 py-1">
          AGOTADO
        </div>
      )}

      {/* Imagen */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#111]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            // Fallback si la imagen no carga
            (e.target as HTMLImageElement).src = "/images/placeholder.svg";
          }}
        />
        {/* Overlay industrial */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />

        {/* Categoría sobre imagen */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-display tracking-widest text-[#b85c2c] bg-[#0e0e0e]/80 px-2 py-1">
            {product.categoryName.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        {/* Nombre */}
        <h3 className="font-display text-base text-[#e8e0d5] leading-tight mb-2 group-hover:text-white transition-colors">
          {product.name}
        </h3>

        {/* Descripción */}
        {product.description && (
          <p className="text-[#a89a8a] text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
        )}

        {/* Materiales */}
        {product.materials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.materials.slice(0, 2).map((mat) => (
              <span
                key={mat}
                className="text-[10px] text-[#a89a8a] border border-[#2a2a2a] px-2 py-0.5 font-display tracking-wide"
              >
                {mat}
              </span>
            ))}
          </div>
        )}

        {/* Dimensiones */}
        {product.dimensions && (
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-3 h-3 text-[#b85c2c]" />
            <span className="text-[10px] text-[#a89a8a] font-display tracking-wide">
              {product.dimensions}
            </span>
          </div>
        )}

        {/* Separador */}
        <div className="h-px bg-gradient-to-r from-[#b85c2c]/30 to-transparent mb-4" />

        {/* Precio + CTA */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#a89a8a] font-display tracking-widest block mb-0.5">
              PRECIO
            </span>
            <span className="font-display text-xl text-[#e8e0d5]">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleWhatsApp}
            disabled={isOutOfStock}
            className={`btn-whatsapp flex items-center gap-2 px-4 py-2.5 font-display text-xs tracking-widest transition-colors duration-200 ${
              isOutOfStock
                ? "bg-[#2a2a2a] text-[#4a4a4a] cursor-not-allowed"
                : "bg-[#25D366] hover:bg-[#20b858] text-white cursor-pointer"
            }`}
            aria-label={`Adquirir ${product.name} por WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {isOutOfStock ? "Agotado" : "Adquirir"}
          </button>
        </div>
      </div>
    </article>
  );
}
