import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'


async function getUserWithReviews(id){
  
const prisma = new PrismaClient();
    try{
    const userWithReviews = await prisma.user.findUnique({
        where: { id: id }, // Gebruiker met ID 1
        include: {
        Review: true,  // Haalt alle berichten van deze gebruiker op
        // where: {
        //   location: {
        //     contains: location,
        //   },
    },
  });
  return userWithReviews
    }catch (error) {
        console.error(error);
        throw new Error('Error fetching user with posts');
      }};
  
  export default getUserWithReviews;