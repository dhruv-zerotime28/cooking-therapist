import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import { emailScehma } from '@/Schemas/auth';
import crypto from 'crypto';
import { SendPasswordResetLink } from '@/lib/nodeMailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    const validate = validateRequest(emailScehma, body.email);
    if (validate instanceof NextResponse) {
      return validate;
    }

    const checkAdmin = await prisma.admin.findFirst({
      where: {
        email: {
          mode: 'insensitive',
          equals: body.email,
        },
      },
    });

    if (!checkAdmin) {
      return NextResponse.json(
        { success: false, message: "admin not found" },
        { status: 409 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    const resetTokenExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const tokenDetails = await prisma.resetPasswordToken.create({
      data: {
        email: checkAdmin.email,
        token: resetToken,
        tokenExpiry: resetTokenExpiry,
      },
    });       // in case any err happens during mail sending remove the row from table

    const resetUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/admin/passwordReset?token=${resetToken}&email=${body.email}&id=${tokenDetails.tokenId}`;

    const res = await SendPasswordResetLink({ resetUrl, email: body.email });

    return res;
  
  } catch (error) {
    console.log('forgot pass err:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
