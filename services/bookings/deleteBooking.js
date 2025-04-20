import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'



const deleteBooking = async (id) => {
  const prisma = new PrismaClient()
  try{
    const deletedBooking = await prisma.booking.delete({
      where: {
        id: id,
      }
    });
    return deletedBooking
  } catch (error){
    throw error;
  }
}

export default deleteBooking