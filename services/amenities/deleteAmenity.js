import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'


const deleteAmenity = async (id) => {
  const prisma = new PrismaClient()
  try{
    const amenity = await prisma.amenity.findUnique({ where: { id: id } });
    if (!amenity) {
      throw new Error("User not found");
    }
    const deletedAmenity = await prisma.amenity.delete({
      where: {
        id: id,
      }
    })
    return deletedAmenity
  } catch (error){
    throw error
  }
}

export default deleteAmenity