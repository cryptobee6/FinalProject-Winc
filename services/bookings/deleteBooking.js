import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'


const deleteBooking = async (id) => {
  const prisma = new PrismaClient()
  try{
    const booking = await prisma.booking.findUnique({ where: { id: id } });
    if (!booking) {
      throw new Error("User not found");
    }
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