import { NextRequest, NextResponse } from 'next/server';
import { reciepeDataSchema } from '@/Schemas/recipes';
import { validateRequest } from '@/lib/validate';
import prisma from '@/db/prisma';

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        description :true,
        images:true,
        ingredients:true,
        instruction :true,
        prepTime:true,
        cookTime:true,
        cuisine :true,
        serves:true,
        notes:true,
        rating:true,
        tags :true,
        category:true
      },
    })
    return NextResponse.json(
      { success: true, message: `all listed categories`, data:recipes },
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
  try {
    const body = await request.json();

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
        await tx.recipeTag.createMany({
          data: recipeTag.map((tagId: string) => ({
            recipeId: newRecipe.id,
            tagId,
          })),
        });
      }
    
      
      if (recipeCategory.length > 0) {
        await tx.recipeCategory.createMany({
          data: recipeCategory.map((categoryId: string) => ({
            recipeId: newRecipe.id,
            categoryId,
          })),
        });
      }
    
     
      return tx.recipe.findUnique({
        where: { id: newRecipe.id },
        include: { tags: true, category: true },
      });
    }); 

    return NextResponse.json(
      { success: true, message: `New user Created ${recipe}` },
      { status: 201 }
    )
  } catch (error) {
    console.log('err while adding recipe:',error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    const updatedRecipes = await prisma.category.update({
      where: {
        id: body.id,
      },
      data: {
        ...body.updateFields
      },
    });

    //here make the check for the changes in the tags and category and the one removed will be removed and new one should be added
    
    return NextResponse.json(
      { success: true, message: `Recipes is Updated!` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// const recipe = await prisma.recipe.create({
    //   data:{
    //     ...recipedata,
    //     recipeTag: {
    //       create: recipeTag.map((tagId : string) => ({
    //         tag: { connect: { id: tagId } },
    //       })),
    //     },
    //     recipeCategory: {
    //       create: recipeCategory.map((categoryId : string) => ({
    //         category: { connect: { id: categoryId } },
    //       }))
    //     }
    //   },
    //    include: { recipeTag: true, recipeCategory: true },
    // })
    //works in case of implicit