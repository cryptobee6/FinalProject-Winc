import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const createProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
  const prisma = new PrismaClient()
  try{
    const newProperty = await prisma.property.create({
      data: {
      id: uuid(),
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    }
  });
  return newProperty
} catch (error){
  throw error
}
}
  export default createProperty