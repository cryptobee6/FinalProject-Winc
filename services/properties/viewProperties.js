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
      pricePerNight: {
        equals: pricePerNight
    },
  },
  })
  console.log("properties:", properties)
  if (properties.length === 0) {
    throw new Error("No property found");
  }
  return properties;
}

export default viewProperties;