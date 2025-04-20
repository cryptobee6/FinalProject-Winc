//import users from '../../src/data/users.json' with { type: "json" };
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'

const viewUsers = async (id, username, email) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    where:{
      id: id,
      username: username,
      email: email,
    }
  })
if (!users) {
  throw new NotFoundError('username', username);
}
return users;
};

export default viewUsers;