// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Hammer } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#catalogo", label: "Catálogo" },
    { href: "#cocina", label: "Cocina" },
    { href: "#sala", label: "Sala" },
    { href: "#cuarto", label: "Cuarto" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0e0e0e]/95 backdrop-blur-sm border-b border-[#2a2a2a]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#b85c2c] flex items-center justify-center">
              <Hammer className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-display text-lg text-[#e8e0d5] block leading-none">
                {process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Muebles Industriales"}
              </span>
              <span className="text-[10px] text-[#b85c2c] tracking-widest uppercase block">
                Madera &amp; Hierro
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-display text-[#a89a8a] hover:text-[#e8e0d5] transition-colors duration-200 tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden lg:flex">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#b85c2c] hover:bg-[#d4703a] text-white text-sm font-display tracking-wider px-5 py-2.5 transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-[#e8e0d5] p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#2a2a2a] py-4 bg-[#0e0e0e] animate-fade-in-up">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 text-[#a89a8a] hover:text-[#e8e0d5] font-display text-sm tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#b85c2c] text-white font-display text-sm tracking-wider py-3 transition-colors hover:bg-[#d4703a]"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
