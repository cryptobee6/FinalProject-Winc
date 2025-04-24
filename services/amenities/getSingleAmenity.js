import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function getSingleAmenity(id) {
    const prisma = new PrismaClient()
    
    try{

        if (!id || id.trim() === "") {
            throw new Error("ID mag niet leeg zijn");
          }
    
    const amenity = await prisma.amenity.findUnique({
        where: {
            id: id,
        },
    })

    if (!amenity){
        return null 
    }
    
    return amenity;
}
catch (error){
    throw error
}
}


export default getSingleAmenity;