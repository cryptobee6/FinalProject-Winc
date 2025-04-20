import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
  const prisma = new PrismaClient()
  try{  
  const newHost = await prisma.host.create({
    data: {
      id: uuid(),
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    }
  })
  return newHost
} catch (error){
  throw error
  }
}
  
  export default createHost