import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import prisma from '@/db/prisma';
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      let res 
      if(body.action === 'login'){
        res = logIn(body.credential)
      }
      if(body.action === 'logout'){
        res =logOut(body.credential)
      }
      return res
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { success: false, message: 'Internal Server Error!' },
        { status: 500 }
      );
    }
  }


  async function logIn (cred:any){
    console.log("recieved logIn credetials",cred)
    return NextResponse.json(
        { success: true, message: `User Logged In` },
        { status: 200 }
      );
  }

  async function logOut(cred:any) {
    console.log("recieved logOut credetials",cred);
    return NextResponse.json(
        { success: true, message: `User Logged Out` },
        { status: 200 }
      );
  }