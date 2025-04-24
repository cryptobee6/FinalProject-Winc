import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'



const deleteHost = async (id) => {
  const prisma = new PrismaClient()
  try{
    const host = await prisma.host.findUnique({ where: { id: id } });
    if (!host) {
      throw new Error("User not found");
    }
    const deletedHost = await prisma.host.delete({
      where:{
        id: id,
      }
    })
    return deletedHost
  }catch (error){
    throw error
  }
}


export default deleteHost