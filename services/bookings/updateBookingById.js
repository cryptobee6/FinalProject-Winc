import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const updateBookingById = async (id, updateData) => {
  const prisma = new PrismaClient()
  try{
    const updatedBookingById = await prisma.booking.update({
      where: {id: id},
      data: updateData
    }
  )
  return updatedBookingById
  } catch(error){
    throw error
  }}
  
  export default updateBookingById