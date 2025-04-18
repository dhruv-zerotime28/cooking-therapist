import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import { sendContactUsReply } from '@/lib/nodeMailer';
import { MessageReplySchema } from '@/Schemas/contactUs';
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const sortField = searchParams.get('sortField') || 'createdAt';

  try {
    const messages = await prisma.contactUs.findMany({
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
        message: true,
        email: true,
        createdAt: true,
        status: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `all listed categories`,
        data: messages,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.debug('api err in fetching messages :', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  try {
    const validate = await validateRequest(MessageReplySchema, body);
    const { id, ...mailDetails } = body;

    await sendContactUsReply(mailDetails);
    
    const updateMessageStatus = await prisma.contactUs.update({
      where: {
        id: id,
      },
      data: {
        status: `READ`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Reply sent to User`,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.debug('api err while contact patch req :', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  try {
    //check the data with id
    const check = await prisma.contactUs.findFirst({
      where: {
        id: body,
      },
    });

    const deleteMsg = await prisma.contactUs.delete({
      where: {
        id: body,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: `deleted message`,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.debug('api err while deleting the msg :', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
