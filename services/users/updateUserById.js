import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function updateUserById(id, updateData){
    const prisma = new PrismaClient()
      try{
        const updatedUserById = await prisma.user.update({
          where: {id: id},
          data: updateData
          }
        )
  
    return updatedUserById
  } catch(error){
    if (error.code === 'P2025') {
      throw new Error('User not found');
    }
}}
  export default updateUserById