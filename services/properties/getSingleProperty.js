import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function getSingleProperty(id) {
    const prisma = new PrismaClient()
    
    try{

        if (!id || id.trim() === "") {
            throw new Error("ID mag niet leeg zijn");
          }
    
    const property = await prisma.property.findUnique({
        where: {
            id: id,
        },
    })

    if (!property){
        throw ("hello something went wrong")
    }
    
    return property;
}
catch (error){
    throw error
}
  }


export default getSingleProperty;