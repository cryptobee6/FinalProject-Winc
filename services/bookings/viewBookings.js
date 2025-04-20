import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewBookings = async (userId)=> {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
        userId: userId,
    }
})
  return bookings;
}

export default viewBookings;