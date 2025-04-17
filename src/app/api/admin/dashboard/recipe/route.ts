import { NextRequest, NextResponse } from 'next/server';
import { reciepeDataSchema, updateRecipesSchema } from '@/Schemas/recipes';
import { validateRequest } from '@/lib/validate';
import prisma from '@/db/prisma';
import { reciepeIdType } from '@/Schemas/recipes';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { deleteMultipleFromS3 } from '@/lib/DeleteImages';

interface ITag {
  id: string;
  name: string;
}
interface ICat {
  id: string;
  name: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const sortField = searchParams.get('sortField') || 'createdAt';

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
      orderBy: {
        [sortField]: 'desc',
      },
      skip: (page - 1) * 10,
      select: {
        id: true,
        name: true,
        cuisine: true,
        prepTime: true,
        cookTime: true,
        rating: true,
        createdAt: true,
      },
    });
    return NextResponse.json(
      { success: true, message: `all listed categories`, data: recipes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const validated = validateRequest(reciepeDataSchema, body);
    if (validated instanceof NextResponse) {
      return validated;
    }

    const { recipeTag, recipeCategory, ...recipedata } = body;

    const recipe = await prisma.$transaction(async (tx) => {
      const newRecipe = await tx.recipe.create({
        data: { ...recipedata },
      });

      //also here we can check weather the all the tags and category are there or not

      if (recipeTag.length > 0) {
        const tags = recipeTag.map((tagId: ITag) => tagId.id);
        await tx.recipeTag.createMany({
          data: tags.map((tagId: string) => ({
            recipeId: newRecipe.id,
            tagId: tagId,
          })),
          skipDuplicates: true,
        });

        await tx.tag.updateMany({
          where: {
            id: {
              in: tags,
            },
          },
          data: {
            recipesCount: {
              increment: 1,
            },
          },
        });
      }

      if (recipeCategory.length > 0) {
        const category = recipeCategory.map((catId: ICat) => catId.id);
        await tx.recipeCategory.createMany({
          data: category.map((categoryId: string) => ({
            recipeId: newRecipe.id,
            categoryId: categoryId,
          })),
          skipDuplicates: true,
        });

        await tx.category.updateMany({
          where: {
            id: {
              in: recipeCategory,
            },
          },
          data: {
            recipesCount: {
              increment: 1,
            },
          },
        });
      }

      return tx.recipe.findUnique({
        where: { id: newRecipe.id },
        include: { tags: true, category: true },
      });
    });

    return NextResponse.json(
      { success: true, message: `New Reciepe Added` },
      { status: 201 }
    );
  } catch (error) {
    const dltImages = await deleteMultipleFromS3(body.images);
    console.log('err while adding recipe:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  try {
    const validated = validateRequest(updateRecipesSchema, body);
    if (validated instanceof NextResponse) {
      return validated;
    }

    const {
      id,
      removedUrls,
      addedTags,
      addedCategory,
      removedCategory,
      removedTags,
      oldUrls,
      newUrls,
      ...other
    } = body;

    const recipe = await prisma.$transaction(async (tx) => {
      const updateRecipe = await tx.recipe.update({
        where: {
          id: id,
        },
        data: {
          name: other.name,
          description: other.description,
          images: [...oldUrls, ...newUrls],
          ingredients: other.ingredients,
          instruction: other.instruction,
          prepTime: other.prepTime,
          cookTime: other.cookTime,
          cuisine: other.cuisine,
          serves: other.servers,
          notes: other.notes,
          rating: other.rating,
        },
      });

      //add the newly added tags and category
      if (addedTags.length > 0) {
        const tags = addedTags.map((tagId: ITag) => tagId.id);

        await tx.recipeTag.createMany({
          data: tags.map((tagId: string) => ({
            recipeId: id,
            tagId: tagId,
          })),
          skipDuplicates: true,
        });

        await tx.tag.updateMany({
          where: {
            id: {
              in: tags,
            },
          },
          data: {
            recipesCount: {
              increment: 1,
            },
          },
        });
      }

      if (addedCategory.length > 0) {
        const category = addedCategory.map((catId: ICat) => catId.id);

        await tx.recipeCategory.createMany({
          data: category.map((categoryId: string) => ({
            recipeId: id,
            categoryId: categoryId,
          })),
          skipDuplicates: true,
        });

        await tx.category.updateMany({
          where: {
            id: {
              in: category,
            },
          },
          data: {
            recipesCount: {
              increment: 1,
            },
          },
        });
      }

      //remove the tags and categories
      if (removedCategory.length > 0) {
        await tx.recipeCategory.deleteMany({
          where: {
            recipeId: id,
            categoryId: {
              in: removedCategory.map((cat: ICat) => cat.id),
            },
          },
        });
      }

      if (removedTags.length > 0) {
        await tx.recipeTag.deleteMany({
          where: {
            recipeId: id,
            tagId: {
              in: removedTags.map((tag: ITag) => tag.id),
            },
          },
        });
      }

      return tx.recipe.findUnique({
        where: { id: updateRecipe.id },
        include: { tags: true, category: true },
      });
    });

    const dltImages = await deleteMultipleFromS3([...removedUrls]);

    return NextResponse.json(
      { success: true, message: `recipe details updated!` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    await deleteMultipleFromS3(body.newUrls);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // just make the flag as false
  try {
    const body = await request.json();

    const validate = validateRequest(reciepeIdType, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const checkItem = await prisma.recipe.findFirst({
      where: {
        ...body,
      },
    });

    if (!checkItem) {
      return NextResponse.json(
        { success: false, message: "Coundn't find the recipe!!" },
        { status: 500 }
      );
    }

    await prisma.recipe.delete({
      where: {
        ...body,
      },
    });
    return NextResponse.json(
      { success: true, message: `Recipe deleted sucessfully!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
