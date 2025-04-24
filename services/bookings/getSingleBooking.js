import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function getSingleBooking(id) {
    const prisma = new PrismaClient()
    
    try{

        if (!id || id.trim() === "") {
            throw new Error("ID mag niet leeg zijn");
          }
    
    const booking = await prisma.booking.findUnique({
        where: {
            id: id,
        },
    })

    if (!booking){
        return null 
    }
    
    return booking;
}
catch (error){
    throw error
}
  }


export default getSingleBooking;