import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewHosts = async (name)=> {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
  }
})
  return hosts;
}

export default viewHosts;