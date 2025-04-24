import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewAmenities = async (name) => {
  const prisma = new PrismaClient();
  const amenities = await prisma.amenity.findMany({
    where: {
      name: name,
    }
  })
  return amenities;
}

export default viewAmenities;