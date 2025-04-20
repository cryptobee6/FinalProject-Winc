import { PrismaClient } from '@prisma/client';

const getUserNameId =  async (username) => {
  const prisma = new PrismaClient();
    try {
      // Zoeken naar de gebruiker en hun posts
      const userName = await prisma.user.findUnique({
        where: { 
            username: username
        },
        })
  
      return userName
    } catch (error) {
      throw new Error(`Error fetching user and posts: ${error.message}`);
    }
  }

 export default getUserNameId 