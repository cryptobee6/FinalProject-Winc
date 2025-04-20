import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../middleware/errorHandler.js';

const getPropertiesHost = async (hostId) => {
  const prisma = new PrismaClient();
  const propertyHost = await prisma.host.findUnique({
    where: {
      id: hostId,
    },
    include: {
      host: true,
    },
  });
  if (!propertyHost) {
    throw new NotFoundError('Property', hostId);
  }
  return propertyAmenity;
};

export default getPropertiesHost;