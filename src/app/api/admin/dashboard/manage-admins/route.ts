import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/validate';
import prisma from '@/db/prisma';
import { changePasswordSchema} from '@/Schemas/auth';
import { addEditAdminScehma, addEditAdminType } from '@/Schemas/admin';
import { newAdminCredentials } from '@/lib/nodeMailer';
import bcrypt from 'bcryptjs';
import { checkAdminDetails } from '@/lib/checkAdminId';
import { adminManagementTable } from '@/Schemas/admin';
import logger from '@/lib/logger';


export async function GET(req : NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const sortField = searchParams.get("sortField") || "createdAt";
 
  try {
    const admins = await prisma.admin.findMany({
      where : {
        name : {contains : search,mode : "insensitive"}
      },
      orderBy :{
        [sortField] : "desc"
      },
      skip :(page - 1) * 10,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt : true,
        createdBy: {
          select: { name: true }
        }
      },
    });

    const adminsList = admins.map(({ createdBy, ...admin }) => ({
      ...admin,
      createdBy: createdBy?.name || "No Creator"
    }));

    return NextResponse.json(
      { success: true, data: adminsList},
      { status: 200 }
    );
  } catch (error) {
    logger.debug('api err while fetching the admins :', error);(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const headersList = new Headers(request.headers);
 
  try {
    const body = await request.json();

    const adminId = headersList.get("adminid")
    if(!adminId){
      return NextResponse.json(
        { success: false, message: 'Unauthorized ' },
        { status: 403 }
      );
    }

    const validate = validateRequest(addEditAdminScehma, body);
    if (validate instanceof NextResponse) {
      return validate;
    }

    //add unique constrain for email check
    const checkSameEmail = await prisma.admin.findUnique({
      where:{
        email : body.email.toLowerCase()
      }
    })

    if(checkSameEmail){ 
      return NextResponse.json(
        { success: false, message: 'admins with same email exits' },
        { status: 409 }
      );
    }
    const randomPasswordGeneration = generateRandomPassword();
    const hashedPass = await bcrypt.hash(randomPasswordGeneration, 12);

    const newAdmin = await prisma.admin.create({
        data : {
            name : body.name,
            email : body.email,
            password : hashedPass,
            createdBy: {
              connect: { id: adminId }
            }
        }
    })

    if(newAdmin){
        const res = await newAdminCredentials({email: body.email,password : randomPasswordGeneration});
        // do we need to check if err then dlt the user details from the db
        return res
    }
    
  } catch (error) {
    logger.debug('api err while adding new admin:', error);(error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {             //change password option 
  try {
    const headersList = new Headers(request.headers);
    const adminId = headersList.get("adminid")
    
    if(!adminId){
      return NextResponse.json(
        { success: false, message: 'Unauthorized ' },
        { status: 403 }
      );
    }else{
      await checkAdminDetails(adminId);
    }  

    const body = await request.json();

    const validate = validateRequest(changePasswordSchema, body);
    if (validate instanceof NextResponse) {
      return validate;
    }
   
    const checkAdmin = await prisma.admin.findFirst({
      where:{
        id :adminId  
      }
    })
    
    if(!checkAdmin){
      return NextResponse.json(
        { success: false, message:"Coundn't find the Admin with this mail!" },
        { status: 422 }
      );
    }
  
    const compareOldPassword = await bcrypt.compare(body.oldPassword,checkAdmin.password);
   
    if (!compareOldPassword) {
        return NextResponse.json(
          { success: false, message: "old password doesn't match" },
          { status: 409 }
        );
      }
     
    const hashedPass = await bcrypt.hash(body.newPassword, 12);

    await prisma.admin.update({
      where: {
        id: adminId,                //here id can also be added
      },
      data: {
        password : hashedPass,
      },
    });
 
    const response = NextResponse.json(
      { success: true, message: `Password updated!` },
      { status: 200 }
    );

    response.cookies.delete("admin_token");

    return response

  } catch (error) {
    logger.debug('api err while updating the admin info:', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error!' },
      { status: 500 }
    );
  }
}

const generateRandomPassword = (): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*";
  const allChars = uppercase + lowercase + digits + specialChars;

  let password = "";

  // Ensure at least one character from each required category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password length (8-20 characters)
  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to remove predictable patterns
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};


