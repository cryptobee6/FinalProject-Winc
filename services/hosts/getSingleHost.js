import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function getSingleHost(id) {
    const prisma = new PrismaClient()
    
    try{

        if (!id || id.trim() === "") {
            throw new Error("ID mag niet leeg zijn");
          }
    
    const host = await prisma.host.findUnique({
        where: {
            id: id,
        },
    })

    if (!host){
        throw ("hello something went wrong")
    }
    
    return host;
}
catch (error){
    throw error
}
  }


export default getSingleHost;