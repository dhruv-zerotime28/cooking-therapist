import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import logger from '@/lib/logger';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
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
    });

    const simplifiedRecipe = {
      ...recipe,
      recipeTag: recipe?.tags.map((t) => t.tag),
      recipeCategory: recipe?.category.map((c) => c.category),
    };

    return NextResponse.json(
      {
        success: true,
        message: `all listed categories`,
        data: simplifiedRecipe,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.debug('api err in fetching recipes :', error);(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

//this one is originally get but we can't have more than one get req that's why we have made it post
// and instead of fecthing with the main request are fetching it after so that less time taken for response
// and realted dishes will sepraetlly fetched
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const tags = await req.json();
  const recipeId = (await params).id;
  try {
    const recipesWithMatchingTags = await prisma.recipeTag.findMany({
      where: {
        tagId: { in: tags },
        recipeId: { not: recipeId },
      },
      select: {
        recipeId: true,
      },
    });


    const tagMatchCount: Record<string, number> = {};

    recipesWithMatchingTags.forEach(({ recipeId }) => {
      tagMatchCount[recipeId] = (tagMatchCount[recipeId] || 0) + 1;
    });

    const sortedRelatedRecipeIds = Object.entries(tagMatchCount)
      .sort((a, b) => b[1] - a[1]) // sort descending by match count
      .slice(0, 4) // get top 4
      .map(([recipeId]) => recipeId);


    const relatedRecipes = await prisma.recipe.findMany({
      where: {
        id: { in: sortedRelatedRecipeIds },
      },
      select: {
        id: true,
        name: true,
        images: true,
        prepTime: true,
        cookTime: true,
        description: true,
        cuisine: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `all realted recipes`,
        data: relatedRecipes,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.debug('api err in getting related recipes:', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
