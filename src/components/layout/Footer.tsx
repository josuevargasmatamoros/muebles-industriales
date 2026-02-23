// src/components/layout/Footer.tsx
import { Hammer, MessageCircle, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567";

  return (
    <footer id="contacto" className="bg-[#0a0a0a] border-t border-[#2a2a2a] mt-24">
      {/* Divider decorativo */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#b85c2c] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-[#b85c2c] flex items-center justify-center">
                <Hammer className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-display text-lg text-[#e8e0d5] block leading-none">
                  Muebles Industriales
                </span>
                <span className="text-[10px] text-[#b85c2c] tracking-widest uppercase">
                  Madera &amp; Hierro
                </span>
              </div>
            </div>
            <p className="text-[#a89a8a] text-sm leading-relaxed">
              Creamos muebles con alma. Cada pieza es diseñada y fabricada a
              mano, combinando la calidez de la madera con la fortaleza del
              hierro.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-display text-[#e8e0d5] text-sm tracking-widest mb-5">
              Categorías
            </h3>
            <ul className="space-y-3">
              {["Cocina", "Sala", "Cuarto"].map((cat) => (
                <li key={cat}>
                  <a
                    href={`#${cat.toLowerCase()}`}
                    className="text-[#a89a8a] hover:text-[#b85c2c] text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#b85c2c] rounded-full" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display text-[#e8e0d5] text-sm tracking-widest mb-5">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#a89a8a] hover:text-[#25D366] transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-[#a89a8a] text-sm">
                  <Mail className="w-4 h-4 text-[#b85c2c]" />
                  {/* Agrega tu email aquí */}
                  infinitywoods@gmail.com
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 text-[#a89a8a] text-sm">
                  <MapPin className="w-4 h-4 text-[#b85c2c]" />
                  {/* Agrega tu ciudad aquí */}
                  Costa Rica
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#4a4a4a] text-xs tracking-wider font-display">
            © {new Date().getFullYear()} Muebles Industriales. Todos los derechos reservados.
          </p>
          <p className="text-[#4a4a4a] text-xs">
            Hecho con artesanía 🔧
          </p>
        </div>
      </div>
    </footer>
  );
}
