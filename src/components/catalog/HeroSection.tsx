// src/components/catalog/HeroSection.tsx
import { ArrowDown, Hammer } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background con textura */}
      <div className="absolute inset-0 bg-[#0e0e0e]">
        {/* Grid industrial decorativo */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(184, 92, 44, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184, 92, 44, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Degradado de fondo derecho */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#b85c2c]/5 to-transparent" />

        {/* Línea decorativa vertical */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#b85c2c]/10" />
      </div>

      {/* Número decorativo grande */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 font-display text-[20vw] text-[#1a1a1a] leading-none select-none pointer-events-none hidden lg:block"
        aria-hidden
      >
        MI
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          {/* Pre-título */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#b85c2c]" />
            <span className="font-display text-xs text-[#b85c2c] tracking-[0.3em]">
              ARTESANÍA INDUSTRIAL
            </span>
          </div>

          {/* Título principal */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#e8e0d5] leading-none mb-6">
            <span className="block">MUEBLES</span>
            <span className="block text-[#b85c2c]">INDUSTRIALES</span>
            <span className="block text-[#a89a8a] text-3xl sm:text-4xl lg:text-5xl mt-2">
              Madera &amp; Hierro
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-[#a89a8a] text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-light">
            Cada pieza es diseñada y fabricada a mano. Combinamos la calidez de
            la madera maciza con la fortaleza del hierro forjado para crear
            muebles con carácter propio y durabilidad excepcional.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#catalogo"
              className="flex items-center gap-3 bg-[#b85c2c] hover:bg-[#d4703a] text-white font-display text-sm tracking-widest px-8 py-4 transition-colors duration-200"
            >
              <Hammer className="w-4 h-4" />
              VER CATÁLOGO
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-transparent border border-[#2a2a2a] hover:border-[#b85c2c] text-[#a89a8a] hover:text-[#e8e0d5] font-display text-sm tracking-widest px-8 py-4 transition-all duration-200"
            >
              CONTACTAR
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-[#2a2a2a]">
            {[
              { value: "100%", label: "Artesanal" },
              { value: "3", label: "Categorías" },
              { value: "Madera", label: "& Hierro" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl text-[#b85c2c]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#a89a8a] tracking-widest font-display mt-0.5">
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4a4a4a]">
        <span className="font-display text-[10px] tracking-[0.3em]">SCROLL</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
