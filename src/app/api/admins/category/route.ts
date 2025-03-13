import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import { categoryReq, categorySchema } from '@/Schemas/categories';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(
      { success: true, message: `all listed categories`, data: categories },
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
    });
    console.log('cat created:', newCategory);
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

    const validate = validateRequest(categoryReq, body);
    if (validate instanceof NextResponse) {
      return validate;
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

    const updatedCategory = await prisma.category.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
      },
    });

    console.log(updatedCategory);
    return NextResponse.json(
      { success: true, message: `Category name updated!` },
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
