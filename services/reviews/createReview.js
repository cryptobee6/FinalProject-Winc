import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient()
  try{
    const newReview = await prisma.review.create({
      data: {
        id: uuid(),
        userId,
        propertyId,
        rating,
        comment
    }
  })
  return newReview
} catch (error){
  throw error
}
}
  export default createReview