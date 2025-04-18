import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import { validateRequest } from '@/lib/validate';
import { ContatctUsFormSchema } from '@/Schemas/contactUs';
import logger from '@/lib/logger';

export async function POST(req: NextRequest) {
  const msg = await req.json();
  try {
   
    const vali = validateRequest(ContatctUsFormSchema,msg);
    
    await prisma.contactUs.create({
      data:{
        ...msg
      }
    });
    
    return NextResponse.json(
      { success: true, message: 'Your message being sent!' },
      { status: 200 }
    );
  } catch (error) {
    logger.debug('api err in category adding contact us msg :', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
