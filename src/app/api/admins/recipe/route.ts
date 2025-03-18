import { NextRequest, NextResponse } from 'next/server';
import { reciepeDataSchema } from '@/Schemas/recipes';
import { validateRequest } from '@/lib/validate';
import prisma from '@/db/prisma';
import { reciepeIdType } from '@/Schemas/recipes';


interface ITag {
  id : string,
  name : string
}
interface ICat {
  id : string,
  name : string
}

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
    
    const {relatedRecipes,recipeTag, recipeCategory, ...recipedata } = body;
    
    
    recipedata.images = [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800',
    ]

    console.log(relatedRecipes,recipeTag, recipeCategory,recipedata)
    const recipe = await prisma.$transaction(async (tx) => {
     
      const newRecipe = await tx.recipe.create({
        data: { ...recipedata,
         },
      });
    
      //also here we can check weather the all the tags and category are there or not
     
      if (recipeTag.length > 0) {
        await tx.recipeTag.createMany({
          data: recipeTag.map((tagId:ITag) => ({
            recipeId: newRecipe.id,
            tagId : tagId.id,
          })),
        });
      }
    
      
      if (recipeCategory.length > 0) {
        await tx.recipeCategory.createMany({
          data: recipeCategory.map((categoryId: ICat) => ({
            recipeId: newRecipe.id,
            categoryId:categoryId.id,
          })),
        });
      }    
     
      return tx.recipe.findUnique({
        where: { id: newRecipe.id },
        include: { tags: true, category: true },
      });
    }); 

    return NextResponse.json(
      { success: true, message: `New Reciepe Added`},
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
    
    const updatedRecipes = await prisma.recipe.update({
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
  try {
    const body = await request.json();

    const validate = validateRequest(reciepeIdType, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const checkItem = await prisma.recipe.findFirst({
      where:{
        ...body
      }
    })

    if(!checkItem){
      return NextResponse.json(
        { success: false, message:"Coundn't find the recipe!!" },
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
    console.log(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
