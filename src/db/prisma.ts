import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  try {
    return new PrismaClient();
  } catch (error) {
    console.error('Error initializing PrismaClient:', error);
    throw new Error('Failed to initialize PrismaClient');
  }
};

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const prisma = global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') global.prismaGlobal = prisma;

export default prisma;
