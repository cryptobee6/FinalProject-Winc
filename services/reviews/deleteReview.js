import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'


const deleteReview = async (id) => {
  const prisma = new PrismaClient()
  try{
    const review = await prisma.review.findUnique({ where: { id: id } });
    if (!review) {
      throw new Error("User not found");
    }
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