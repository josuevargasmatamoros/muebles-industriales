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
      imageUrl: "https://res.cloudinary.com/dmmowilvn/image/upload/v1771864044/mueble-bar-industrial_z9dodg.jpg",
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
      name: "Mesa Grande con Bancas",
      slug: "mesa-grande-con-bancas",
      description: "Mesa industrial de madera y hierro con bancas incluidas. Ideal para cocina o comedor.",
      price: 190000,
      imageUrl: "https://res.cloudinary.com/dmmowilvn/image/upload/v1771865797/WhatsApp_Image_2026-02-23_at_10.55.07_AM_1_kkf2ek.jpg",
      images: [],
      materials: ["Madera maciza", "Hierro negro mate"],
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
      imageUrl: "https://res.cloudinary.com/dmmowilvn/image/upload/v1771864043/estanteria-industrial_jh8etb.jpg",
      images: [],
      materials: ["Madera de pino natural", "Hierro negro mate"],
      dimensions: "Consultar disponibilidad",
      weight: "Consultar",
      featured: true,
      active: true,
      stock: 8,
      categorySlug: "sala",
    },
    {
      name: "Recibidor con Gaveta",
      slug: "recibidor-con-gaveta",
      description: "Mueble recibidor industrial con gaveta de almacenamiento. Madera y hierro de alta calidad.",
      price: 75000,
      imageUrl: "https://res.cloudinary.com/dmmowilvn/image/upload/v1771865797/WhatsApp_Image_2026-02-23_at_10.55.07_AM_zwsqvm.jpg",
      images: [],
      materials: ["Madera maciza", "Hierro negro mate"],
      dimensions: "Consultar disponibilidad",
      weight: "Consultar",
      featured: false,
      active: true,
      stock: 6,
      categorySlug: "sala",
    },
    {
      name: "Recibidor Simple",
      slug: "recibidor-simple",
      description: "Recibidor de estilo industrial minimalista. Perfecto para entrada o sala.",
      price: 38000,
      imageUrl: "https://res.cloudinary.com/dmmowilvn/image/upload/v1771865797/WhatsApp_Image_2026-02-23_at_10.55.08_AM_jsftel.jpg",
      images: [],
      materials: ["Madera maciza", "Hierro negro mate"],
      dimensions: "Consultar disponibilidad",
      weight: "Consultar",
      featured: false,
      active: true,
      stock: 8,
      categorySlug: "sala",
    },
    {
      name: "Cama en Hierro y Madera",
      slug: "cama-hierro-madera",
      description: "Cama de estilo industrial con estructura de hierro forjado y detalles en madera maciza.",
      price: 100000,
      imageUrl: "https://res.cloudinary.com/dmmowilvn/image/upload/v1771865798/WhatsApp_Image_2026-02-23_at_10.54.59_AM_wrbsmc.jpg",
      images: [],
      materials: ["Madera maciza", "Hierro forjado"],
      dimensions: "Consultar disponibilidad",
      weight: "Consultar",
      featured: true,
      active: true,
      stock: 4,
      categorySlug: "cuarto",
    },
    {
      name: "Closet Industrial",
      slug: "closet-industrial",
      description: "Closet con estructura de hierro negro y paneles de madera. Espacioso y con estilo industrial.",
      price: 115000,
      imageUrl: "https://res.cloudinary.com/dmmowilvn/image/upload/v1771865877/WhatsApp_Image_2026-02-23_at_10.57.37_AM_jnirrh.jpg",
      images: [],
      materials: ["Madera maciza", "Hierro negro mate"],
      dimensions: "Consultar disponibilidad",
      weight: "Consultar",
      featured: true,
      active: true,
      stock: 3,
      categorySlug: "cuarto",
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