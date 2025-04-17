import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const tags = searchParams.getAll('tags[]') || [];
  const categories = searchParams.getAll('categories[]') || [];

  try {
    const tagFilter =
      tags.length > 0 ? { tags: { some: { tagId: { in: tags } } } } : {};

    const categoryFilter =
      categories.length > 0
        ? { category: { some: { categoryId: { in: categories } } } }
        : {};

    const [recipes, totalCount] = await Promise.all([
      prisma.recipe.findMany({
        //1st check isActive Tag then only proceed
        where: {
          name: { contains: search, mode: 'insensitive' },
          ...categoryFilter,
          ...tagFilter,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * 15,
        take:15,
        include: {
          tags: {
            include: {
              tag: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          category: {
            include: {
              category: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      }),
      prisma.recipe.count({
        where: {
          name: { contains: search, mode: 'insensitive' },
          ...categoryFilter,
          ...tagFilter,
        },
      }),
    ]);
    const simplifiedRecipe = recipes.map((recipe) => {
      const { tags, category, ...other } = recipe;
      return {
        ...other,
        recipeTag: tags.map((t) => t.tag),
        recipeCategory: category.map((c) => c.category),
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: `all listed categories`,
        data: {
          recipeData: simplifiedRecipe,
          totalCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
