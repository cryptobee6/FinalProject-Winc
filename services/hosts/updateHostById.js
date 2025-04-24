import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const updateHostById = async (id, updateData) => {
    const prisma = new PrismaClient()
      try{
        const host = await prisma.host.findUnique({ where: { id } });
        if (!host) {
          throw new Error("User not found");
        }

        const updatedHostById = await prisma.host.update({
          where: {id: id},
          data: updateData
        })
        return updatedHostById
      } catch(error){
       throw error
      }
  }
  
  export default updateHostById