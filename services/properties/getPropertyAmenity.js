import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../middleware/errorHandler.js';

const getPropertiesAmenities = async (id) => {
  const prisma = new PrismaClient();
  const propertyAmenity = await prisma.property.findUnique({
    where: {
      id: id,
    },
    include: {
      amenities: true,
    },
  });
  if (!propertyAmenity) {
    throw new NotFoundError('Property', id);
  }
  return propertyAmenity;
};

export default getPropertiesAmenities;