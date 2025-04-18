import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient()
const addAdmin = async()=>{
    const hashedPass = await bcrypt.hash('CTadmin@28', 12);
    const hashedPass2 = await bcrypt.hash('CTadmin2@28', 12);

    await prisma.admin.createMany({
        data:[
            {name : "admin1",email:"dhruv@zerotimesolutions.com",password:hashedPass},
            {name : "admin1",email:"dhiral@zerotimesolutions.com",password:hashedPass2}
        ]
    })
}

 addAdmin().then(()=>console.log('amdin credentials seeded'))
 .catch(()=>{
    console.log('err while seeding admin credentials!')
    prisma.$disconnect()
 })