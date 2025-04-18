import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import {
  categoryReq,
  categorySchema,
  deleteCategoryType,
} from '@/Schemas/categories';
import logger from '@/lib/logger';

export async function GET(req : NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const sortField = searchParams.get("sortField") || "createdAt";
  try {
    const categories = await prisma.category.findMany({
      where : {
        name : {contains : search,mode : "insensitive"}
      },
      orderBy :{
        [sortField] : "desc"
      },
      skip :(page -1) * 10,
      select: {
        id: true,
        name: true,
        recipesCount:true,
        createdAt : true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `all listed categories`,
        data: categories,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.debug('api err while fetching the all categories:', error);
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
    
    const checkSameName = await prisma.category.findFirst({
      where:{
        name :{
          mode : 'insensitive',
          equals : body.name,
        }
      }
    })

    if(checkSameName){
      return NextResponse.json(
        { success: false, message: 'category with sameName exits' },
        { status: 409 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        recipesCount:0
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(
      { success: true, message: `New category Created`},
      { status: 201 }
    );
  } catch (error) {
    logger.debug('api err in category add :', error)
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
        { status: 422 }
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
     logger.debug('api err in category dlt:', error);
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
        { success: false, message: "Unable find the category!!" },
        { status: 422 }
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
    logger.debug('api err in updating category:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}
