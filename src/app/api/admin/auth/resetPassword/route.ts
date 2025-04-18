import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import { resetPassApiSchema } from '@/Schemas/auth';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';


interface ITokenStored {
  resetToken: string;
  resetTokenExpiry: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
   
    const validate = validateRequest(resetPassApiSchema, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const checkToken = await prisma.resetPasswordToken.findFirst({
      where: {
        tokenId: body.id,
        email: body.email,
      },
    });

    if (!checkToken) {
      return NextResponse.json(
        { success: false, message: 'admin not found!' },
        { status: 409 }
      );
    } else {
      await prisma.resetPasswordToken.delete({
        where: {  
          tokenId: body.id,
        },
      });
    }

    if (checkToken.tokenExpiry < new Date()) {
      return NextResponse.json(
        { success: false, message: 'Time Expire for password Reset' },
        { status: 400 }
      );
    }

    if (checkToken.token !== body.token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized!,link doesn't match" },
        { status: 400 }
      );
    }

    const newHashedPassword = await bcrypt.hash(body.password, 12);

    await prisma.admin.update({
      where: {
        email: body.email,
      },
      data: {
        password: newHashedPassword,
      },
    });

    const response = NextResponse.json(
      { success: true, message: 'password updated Successfully!' },
      { status: 201 }
    );

    return response;
   
  } catch (error) {
    logger.debug('api err in reset password :', error);(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
