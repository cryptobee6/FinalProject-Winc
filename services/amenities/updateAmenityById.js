import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const updateAmenityById = async (id, updateData) => {
  const prisma = new PrismaClient()
  try{
    const amenity = await prisma.amenity.findUnique({ where: { id } });
    if (!amenity) {
      throw new Error("User not found");
    }
    const updatedAmenityById = await prisma.amenity.update({
      where: {id: id},
      data: updateData
    }
  ) 
  return updatedAmenityById
  } catch(error){
    throw error
  }  }
  
  export default updateAmenityById