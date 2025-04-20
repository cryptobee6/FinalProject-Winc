import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'



const deleteProperty = async (id) => {
  const prisma = new PrismaClient()
  try{
    const deletedProperty = await prisma.property.delete({
      where: {
        id: id,
      }
    })
    return deletedProperty
  }catch (error){
    throw error
  }
}

export default deleteProperty