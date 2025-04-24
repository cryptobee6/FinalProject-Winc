import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const createAmenity = async (name) => {
  const prisma = new PrismaClient()  
  try{
  const newAmenity = await prisma.amenity.create({
    data: {
      id: uuid(),
      name,
    }
  })
    return newAmenity
  } catch (error){
    throw error
  }
}
  export default createAmenity