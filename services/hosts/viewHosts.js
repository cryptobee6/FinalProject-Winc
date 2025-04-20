import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewHosts = async (name)=> {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    where: {
      name: name,
    }
  })
  return hosts;
}

export default viewHosts;