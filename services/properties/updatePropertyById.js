import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const updatePropertyById = async (id, updateData) => {
  const prisma = new PrismaClient()  
  try{
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new Error("User not found");
    }

    const updatedPropertyById = await prisma.property.update({
      where: {id: id},
      data: updateData
    })
    console.log("updatePropertyById", updatedPropertyById)
    return updatedPropertyById
  } catch(error){
    throw error
  }
}
  
  export default updatePropertyById