import prisma from '@/db/prisma';


export async function checkAdminDetails(id: string) {
  try {
    // Query the database for the admin by ID
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    // If the admin doesn't exist, return a 'null' status or failure message
    if (!admin) {
      return { success: false, message: 'Unauthorized admin' };
    }

    // Return admin data if found
    return { success: true, admin };
  } catch (error) {
    // Handle unexpected database errors
    return { success: false, message: 'Error querying the database' };
  }
}
