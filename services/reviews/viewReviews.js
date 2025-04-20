import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewReviews = async (id) => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany({
    where: {
      id: id
    }
  })
  return reviews;
}

export default viewReviews;