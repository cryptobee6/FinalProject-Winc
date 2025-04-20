// import properties from '../../src/data/properties.json' with { type: "json" };
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewProperties = async (location, pricePerNight)=> {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location: {
        contains: location,
      },
      pricePerNight: pricePerNight
    }
  })
  return properties;
}

export default viewProperties;