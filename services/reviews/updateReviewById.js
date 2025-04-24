import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const updateReviewById = async (id, updateData) => {
  const prisma = new PrismaClient()
  try{
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      throw new Error("User not found");
    }
    const updatedReviewById = await prisma.review.update({
      where: {id: id},
      data: updateData
    })
    return updatedReviewById
  } catch(error){
    throw error
  }
}
  
  export default updateReviewById