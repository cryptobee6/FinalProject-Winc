import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function updateUserById(id, updateData){
    const prisma = new PrismaClient()
      try{
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error("User not found");
        }

        const updatedUserById = await prisma.user.update({
          where: {id: id},
          data: updateData
          }
        )
  
    return updatedUserById
  } catch(error){
    throw error
}}
  export default updateUserById