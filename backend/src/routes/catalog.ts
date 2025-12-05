import { Router } from 'express';
import { prisma } from '../utils/prisma';

export const catalogRouter = Router();

catalogRouter.get('/categories', async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { id: 'asc' } });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

catalogRouter.get('/products', async (req, res, next) => {
  try {
    const { categoryId, search } = req.query;
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: categoryId ? Number(categoryId) : undefined,
        OR: search
          ? [
              { nameAr: { contains: String(search), mode: 'insensitive' } },
              { nameEn: { contains: String(search), mode: 'insensitive' } }
            ]
          : undefined
      },
      include: { images: { where: { isPrimary: true }, take: 1 } },
      orderBy: { createdAt: 'desc' },
      take: 24
    });
    res.json({ products });
  } catch (error) {
    next(error);
  }
});
