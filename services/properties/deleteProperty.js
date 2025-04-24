import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'



const deleteProperty = async (id) => {
  const prisma = new PrismaClient()
  try{
    const property = await prisma.property.findUnique({ where: { id: id } });
    if (!property) {
      throw new Error("User not found");
    }
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