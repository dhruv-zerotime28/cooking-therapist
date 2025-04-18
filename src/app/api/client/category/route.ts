import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    logger.debug('api err while fetching category :', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}