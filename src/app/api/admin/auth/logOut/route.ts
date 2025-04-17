import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAdminDetails } from '@/lib/checkAdminId';

const enviorment = `${process.env.CT_ENV}`;

export async function POST(request: NextRequest) {
  try {
    const headersList = new Headers(request.headers);
    const id = headersList.get("adminId")
   
    if(!id){
      return NextResponse.json(
        { success: false, message: 'Unauthorized ' },
        { status: 403 }
      );
    }else{
      const AdminIdConfirm = checkAdminDetails(id);
      // if (AdminIdConfirm instanceof NextResponse) {
      //   return AdminIdConfirm;
      // }
    }  

    const response = NextResponse.json(
      { success: true, message: 'admin logged Out' },
      { status: 201 }
    );

    response.cookies.delete('admin_token');

    return response;
  } catch (error) {
    console.log('sign In err:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}