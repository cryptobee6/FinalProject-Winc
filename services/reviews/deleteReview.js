import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'


const deleteReview = async (id) => {
  const prisma = new PrismaClient()
  try{
    const deletedReview = await prisma.review.delete({
      where: {
        id: id,
      }
    })
    return deletedReview
  } catch (error){
    throw error;
  }
}

export default deleteReview