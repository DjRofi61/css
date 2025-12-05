import { prisma } from '../utils/prisma';

async function main() {
  const categories = [
    { slug: 'abayas-shaylas', nameAr: 'عبايات وشيلات', nameEn: 'Abayas & Shawls' },
    { slug: 'dresses-gowns', nameAr: 'مخاويير وفساتين', nameEn: 'Dresses & Gowns' },
    { slug: 'fabrics', nameAr: 'اقمشة', nameEn: 'Fabrics' },
    { slug: 'watches-accessories', nameAr: 'ساعات واكسسوارات', nameEn: 'Watches & Accessories' },
    { slug: 'bags-shoes', nameAr: 'شنط وشوزات', nameEn: 'Bags & Shoes' },
    { slug: 'beauty', nameAr: 'عطور ومايكاب وكريمات', nameEn: 'Perfumes, Makeup & Creams' },
    { slug: 'others', nameAr: 'آخرى', nameEn: 'Others' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }

  const products = [
    {
      slug: 'lux-abaya',
      nameAr: 'عباية فاخرة',
      nameEn: 'Luxury Abaya',
      descriptionAr: 'عباية عملية بأقمشة فاخرة ولمسات ذهبية.',
      descriptionEn: 'Everyday luxury abaya with golden detailing.',
      price: '249.00',
      quantity: 25,
      isFeatured: true,
      categorySlug: 'abayas-shaylas',
      primaryImage: 'https://images.unsplash.com/photo-1496747611180-206a5c8c8f52?auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'evening-gown',
      nameAr: 'فستان سهرة',
      nameEn: 'Evening Gown',
      descriptionAr: 'فستان سهرة أنيق بقصة انسيابية.',
      descriptionEn: 'Flowy evening gown for special occasions.',
      price: '329.00',
      quantity: 18,
      isFeatured: true,
      categorySlug: 'dresses-gowns',
      primaryImage: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'signature-perfume',
      nameAr: 'عطر توقيع',
      nameEn: 'Signature Perfume',
      descriptionAr: 'مزيج شرقي مع نفحات عصرية.',
      descriptionEn: 'Oriental-modern blend with long-lasting notes.',
      price: '189.00',
      quantity: 40,
      isFeatured: false,
      categorySlug: 'beauty',
      primaryImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80'
    }
  ];

  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { slug: product.categorySlug } });
    if (!category) continue;

    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        descriptionAr: product.descriptionAr,
        descriptionEn: product.descriptionEn,
        price: product.price,
        quantity: product.quantity,
        isFeatured: product.isFeatured,
        categoryId: category.id
      },
      create: {
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        descriptionAr: product.descriptionAr,
        descriptionEn: product.descriptionEn,
        price: product.price,
        quantity: product.quantity,
        isFeatured: product.isFeatured,
        categoryId: category.id,
        slug: product.slug
      }
    });

    const primaryImage = await prisma.productImage.findFirst({ where: { productId: created.id, isPrimary: true } });

    if (primaryImage) {
      await prisma.productImage.update({
        where: { id: primaryImage.id },
        data: { imageUrl: product.primaryImage, altText: created.nameEn }
      });
    } else {
      await prisma.productImage.create({
        data: { productId: created.id, imageUrl: product.primaryImage, altText: created.nameEn, isPrimary: true }
      });
    }
  }
}

main()
  .then(() => {
    console.log('Seed data inserted.');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
