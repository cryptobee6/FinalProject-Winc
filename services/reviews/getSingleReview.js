import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function getSingleReview(id) {
    const prisma = new PrismaClient()
    
    try{

        if (!id || id.trim() === "") {
            throw new Error("ID mag niet leeg zijn");
          }
    
    const review = await prisma.review.findUnique({
        where: {
            id: id,
        },
    })

    if (!review){
        throw ("hello something went wrong")
    }
    
    return review;
}
catch (error){
    throw error
}
  }


export default getSingleReview;