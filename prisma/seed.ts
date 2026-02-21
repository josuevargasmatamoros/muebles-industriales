import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed...");

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "cocina" },
      update: {},
      create: {
        name: "Cocina",
        slug: "cocina",
        description: "Muebles industriales para cocina",
        icon: "ChefHat",
      },
    }),
    prisma.category.upsert({
      where: { slug: "sala" },
      update: {},
      create: {
        name: "Sala",
        slug: "sala",
        description: "Muebles industriales para sala",
        icon: "Sofa",
      },
    }),
    prisma.category.upsert({
      where: { slug: "cuarto" },
      update: {},
      create: {
        name: "Cuarto",
        slug: "cuarto",
        description: "Muebles industriales para cuarto",
        icon: "Bed",
      },
    }),
  ]);

  console.log("Categorias creadas:", categories.map((c) => c.name));

  const products = [
    {
      name: "Mueble Bar Industrial",
      slug: "mueble-bar-industrial",
      description: "Mueble bar con estructura de hierro negro mate y tablero de madera maciza de pino con luz LED en la base.",
      price: 170000,
      imageUrl: "/images/products/mueble-bar-industrial.jpeg",
      images: [],
      materials: ["Madera de pino macizo", "Hierro negro mate", "Luz LED"],
      dimensions: "Consultar disponibilidad",
      weight: "Consultar",
      featured: true,
      active: true,
      stock: 5,
      categorySlug: "cocina",
    },
    {
      name: "Estanteria Industrial",
      slug: "estanteria-industrial",
      description: "Estanteria con estructura de hierro negro y repisas de madera de pino natural con gabinete inferior.",
      price: 130000,
      imageUrl: "/images/products/estanteria-industrial.jpeg",
      images: [],
      materials: ["Madera de pino natural", "Hierro negro mate"],
      dimensions: "Consultar disponibilidad",
      weight: "Consultar",
      featured: true,
      active: true,
      stock: 8,
      categorySlug: "sala",
    },
  ];

  for (const product of products) {
    const { categorySlug, ...productData } = product;
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) continue;

    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {
        price: productData.price,
        active: productData.active,
        stock: productData.stock,
        imageUrl: productData.imageUrl,
      },
      create: {
        ...productData,
        categoryId: category.id,
      },
    });
  }

  console.log("Productos creados:", products.length);

  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@mueblesind.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@mueblesind.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Seed completado!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });