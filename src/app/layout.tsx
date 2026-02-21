// src/app/layout.tsx
import type { Metadata } from "next";
import { Oswald, Barlow } from "next/font/google";
import "./globals.css";

// Tipografías industriales con carácter
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Muebles Industriales | Madera y Hierro con Carácter",
    template: "%s | Muebles Industriales",
  },
  description:
    "Catálogo de muebles industriales artesanales en madera y hierro. Diseño robusto, elegante y atemporal para tu hogar.",
  keywords: ["muebles industriales", "madera", "hierro", "artesanal", "diseño industrial"],
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: "Muebles Industriales",
    description: "Madera y Hierro con Carácter",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${oswald.variable} ${barlow.variable}`}>
      <body className="bg-[#0e0e0e] text-[#e8e0d5] font-barlow antialiased">
        {children}
      </body>
    </html>
  );
}
