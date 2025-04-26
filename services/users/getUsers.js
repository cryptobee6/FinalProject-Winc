//import users from '../../src/data/users.json' with { type: "json" };
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewUsers = async (username) => {
  const prisma = new PrismaClient();
console.log(typeof username, username)
  const users = await prisma.user.findMany({
    where: {
      username: username,
    }
  })
  console.log("users:", users)
if (!users) {
  throw new Error("No property found");
}
return users;
};

export default viewUsers;