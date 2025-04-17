import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import { signInSchema } from '@/Schemas/auth';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/tokens';


const secretkey = `${process.env.JWT_SECRET_KEYS}`;
const enviorment = `${process.env.CT_ENV}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
   
    const validate = validateRequest(signInSchema, body);
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
        { success: false, message: "admin with email doesn't exists" },
        { status: 409 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      body.password,
      checkAdmin.password
    );

    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "password doesn't match" },
        { status: 409 }
      );
    }

    const token : string | null = await generateToken({id : checkAdmin.id});
    
    if(!token){
      return NextResponse.json(
        { success: false, message: 'Internal Server Error' },
        { status: 500 }
      );
    }
   
   
    const response = NextResponse.json(
      { success: true, message: 'admin logged In',data:{
        id : checkAdmin.id,
        name : checkAdmin.name,
        email : checkAdmin.email
      }
      },
      { status: 201 }
    );

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: enviorment === 'production',
      path: '/',
    });

    return response;
  } catch (error) {
    console.log('sign In err:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
