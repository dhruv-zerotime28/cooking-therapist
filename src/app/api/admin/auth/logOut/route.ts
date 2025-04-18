import prisma from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { checkAdminDetails } from '@/lib/checkAdminId';
import logger from '@/lib/logger';


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
    }  

    const response = NextResponse.json(
      { success: true, message: 'admin logged Out' },
      { status: 201 }
    );

    response.cookies.delete('admin_token');

    return response;
  } catch (error) {
    logger.debug('api err in logOut :', error);(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}