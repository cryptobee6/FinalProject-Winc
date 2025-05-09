import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const createBooking = async (userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice,
  bookingStatus) => {
    const prisma = new PrismaClient()
    try{
    const newBooking = await prisma.booking.create({
      data: {
        id: uuid(),
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      }
    })
    return newBooking
  } catch (error){
    throw error
  }
}
  
  export default createBooking