//import userData from '../../src/data/users.json' with { type: "json" };
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

async function getSingleUser(id) {
    const prisma = new PrismaClient()
    
    try{

        if (!id || id.trim() === "") {
            throw new Error("ID mag niet leeg zijn");
          }
    
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    if (!user){
        return null
    }
    
    return user;
}
catch (error){
    throw error
}
  }


export default getSingleUser;