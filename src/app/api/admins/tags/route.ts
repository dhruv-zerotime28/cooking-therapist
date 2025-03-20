import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import prisma from '@/db/prisma';
import { tagReq, tag, deleteTagReqType } from '@/Schemas/tags';


export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { recipes: true },
        },
      },
    });

    const simplifiedResult = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      count: tag._count.recipes, // Extract the number
    }));

    return NextResponse.json(
      { success: true, data: simplifiedResult },
      { status: 201 }
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

    const validate = validateRequest(tagReq, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    //add unique constrain for name check
    const checkSameName = await prisma.tag.findFirst({
      where:{
        name :{
          mode : 'insensitive',
          equals : body.name,
        }
      }
    })

    if(checkSameName){
      return NextResponse.json(
        { success: false, message: 'tags with sameName exits' },
        { status: 409 }
      );
    }

    const newTag = await prisma.tag.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(
      { success: true, message: `New tag Created` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    const validate = validateRequest(deleteTagReqType, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const checkItem = await prisma.tag.findFirst({
      where:{
        ...body
      }
    })

    if(!checkItem){
      return NextResponse.json(
        { success: false, message:"Coundn't find the tag!" },
        { status: 422 }
      );
    }

    await prisma.tag.delete({
      where: {
        ...body,
      },
    });
    return NextResponse.json(
      { success: true, message: `tag deleted sucessfully!` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const validate = validateRequest(tag, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const checkItem = await prisma.tag.findFirst({
      where:{
        id : body.id
      }
    })

    if(!checkItem){
      return NextResponse.json(
        { success: false, message:"Coundn't find the tag!" },
        { status: 422 }
      );
    }
    
    await prisma.tag.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
      },
    });
    return NextResponse.json(
      { success: true, message: `Tag name updated!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}
