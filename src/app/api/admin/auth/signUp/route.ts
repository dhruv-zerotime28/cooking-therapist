import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import { authSchema} from '@/Schemas/auth';
import bcrypt from 'bcryptjs';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
   
    const validate = validateRequest(authSchema, body);
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

    if (checkAdmin) {
      return NextResponse.json(
        { success: false, message: "admin with same email exits" },
        { status: 409 }
      );
    }

    const hashedPass = await bcrypt.hash(body.password, 12);

    const res = await prisma.admin.create({
        data : {
            name : body.name,
            email : body.email,
            password : hashedPass,
        }
    })

    const response = NextResponse.json(
      { success: true, message: 'New Admin added!' },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.log('sign In err:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
