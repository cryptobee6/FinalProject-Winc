import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function deleteUser(userId) {
  const prisma = new PrismaClient()
  try{
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
  }
  });
    return deletedUser
  }catch (error){
    throw error;
  }
}

export default deleteUser