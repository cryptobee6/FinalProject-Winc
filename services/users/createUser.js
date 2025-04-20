// import userData from '../../src/data/users.json' with { type: "json" };
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function createUser( username, password, name, email, phoneNumber, profilePicture) {
  const prisma = new PrismaClient()
  try{
    const newUser = await prisma.user.create({
      data: {
        id: uuid(),
        username: username,
        password: password,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        profilePicture: profilePicture
    }
  });
    return newUser
  } catch (error){
    throw error
  }
}
  
  export default createUser