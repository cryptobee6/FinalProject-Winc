import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const createUser = async( username, password, name, email, phoneNumber, profilePicture) => {
  const prisma = new PrismaClient()
  try{
    const newUser = await prisma.user.create({
      data: {
        id: uuid(),
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
    }
  })
    return newUser
  } catch (error){
    throw error
  }
}
  
  export default createUser