import { NextRequest,NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(){
  try {
   
    return NextResponse.json(
      { success: true, message: `all listed categories`, data: '' },
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

