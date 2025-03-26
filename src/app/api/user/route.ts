import { NextResponse } from 'next/server';
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
        category:true,
        createdAt:true
      },
    })      //add the pagaination and filters options and incremental sending 
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
