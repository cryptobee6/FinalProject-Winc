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
        }, select: {
            id: true,
            username: true,
            name: true,
            email: true,
            phoneNumber: true,
            profilePicture: true,
            aboutMe: true,
        }
    })

    if (!host){
        return null
    }
    
    return host;
}
catch (error){
    throw error
}
  }


export default getSingleHost;