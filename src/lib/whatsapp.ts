// src/lib/whatsapp.ts
// =====================================================
// UTILIDAD DE WHATSAPP
// =====================================================
// El número se configura en .env.local:
// NEXT_PUBLIC_WHATSAPP_NUMBER="573001234567"
// =====================================================

import type { WhatsAppMessageData } from "@/types";

/**
 * Genera la URL de WhatsApp con el mensaje preformateado
 * para adquirir un producto.
 */
export function generateWhatsAppUrl(data: WhatsAppMessageData): string {
  // Número desde variables de entorno
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567";

  // Precio formateado
  const formattedPrice = formatPrice(data.price);

  // Mensaje que se enviará automáticamente
  const message = [
    `¡Hola! Estoy interesado/a en adquirir el siguiente producto:`,
    ``,
    `🪵 *Producto:* ${data.productName}`,
    `💰 *Precio:* ${formattedPrice}`,
    `🖼️ *Imagen:* ${data.imageUrl}`,
    data.productUrl ? `🔗 *Ver producto:* ${data.productUrl}` : "",
    ``,
    `¿Podría darme más información sobre disponibilidad y envío?`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Formatea el precio según la configuración local
 */
export function formatPrice(price: string | number): string {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const locale = process.env.NEXT_PUBLIC_CURRENCY_LOCALE ?? "es-CR";
  const symbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL ?? "₡";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: locale === "es-CR" ? "CRC" : "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
  } catch {
    return `${symbol}${numericPrice.toLocaleString()}`;
  }
}
