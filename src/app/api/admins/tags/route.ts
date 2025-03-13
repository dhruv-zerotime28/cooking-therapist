import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import prisma from '@/db/prisma';
import { tagReq, tag } from '@/Schemas/tags';

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ success: true, data: tags }, { status: 201 });
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

    const validate = validateRequest(tagReq, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const newTag = await prisma.tag.create({
      data: {
        name: body.name,
      },
    });
    console.log('new Tag created:', newTag);
    return NextResponse.json(
      { success: true, message: `New tag Created` },
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

    const validate = validateRequest(tag, body);
    if (validate instanceof NextResponse) {
      return validate;
    }
    await prisma.tag.delete({
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

    const validate = validateRequest(tag, body);
    if (validate instanceof NextResponse) {
      return validate;
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
    console.log(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}
