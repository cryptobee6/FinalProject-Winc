import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
  const prisma = new PrismaClient()
  try{  
    const createdHost = await prisma.host.create({
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
  return createdHost
} 
catch (error){

if (error.code === 'P2002') {
  throw new Error('Host with that email or username already exists');
}
}
}
  
  export default createHost