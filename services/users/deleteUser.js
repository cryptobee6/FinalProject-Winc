import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function deleteUser(userId) {
  const prisma = new PrismaClient()
  try{
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