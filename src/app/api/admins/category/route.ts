import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import {
  categoryReq,
  categorySchema,
  deleteCategoryType,
} from '@/Schemas/categories';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { recipes: true },
        },
      },
    });

    const simplifiedResult = categories.map((category) => ({
      id: category.id,
      name: category.name,
      count: category._count.recipes, // Extract the number
    }));

    return NextResponse.json(
      {
        success: true,
        message: `all listed categories`,
        data: simplifiedResult,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validate = validateRequest(categoryReq, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      { success: true, message: `New category Created` },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    const validate = validateRequest(deleteCategoryType, body);

    if (validate instanceof NextResponse) {
      return validate;
    }
    //check first does id exits or not also take care of related table id's
    const checkItem = await prisma.category.findFirst({
      where: {
        id : body.id,
      },
    });

    if (!checkItem) {
      return NextResponse.json(
        { success: false, message: "Coundn't find the category!" },
        { status: 500 }
      );
    }

    await prisma.category.delete({
      where: {
        ...body,
      },
    });
    return NextResponse.json(
      { success: true, message: `category deleted sucessfully!` },
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const validate = validateRequest(categorySchema, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    //addition check if id exists or not
    const checkItem = await prisma.category.findFirst({
      where: {
        id : body.id,
      },
    });

    if (!checkItem) {
      return NextResponse.json(
        { success: false, message: "Coundn't find the recipe!!" },
        { status: 500 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { success: true, message: `Category name updated!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}
