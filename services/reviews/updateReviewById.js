import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient()
  try{
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