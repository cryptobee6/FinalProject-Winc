import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'
import jwt from "jsonwebtoken"

const login = async (username, password) => {
  const prisma = new PrismaClient();
  const logins = await prisma.user.findFirst()
  console.log("logins:", logins)

  const secretKey = process.env.AUTH_SECRET_KEY
  console.log("secretKey:", secretKey)

  const token = jwt.sign({ userId: logins.id }, secretKey, { expiresIn: '1h' });
  console.log("token:", token)
  return token
};

export default login;