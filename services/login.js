import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid'
import jwt from "jsonwebtoken"

const login = async (username, password) => {
  const prisma = new PrismaClient();
  
  const logins = await prisma.user.findFirst({
    where: {
      username: username,
      password: password
    }
  }
  )
  console.log("logins:", logins)


  if (!logins) {
    const error = new Error("Ongeldige gebruikersnaam of wachtwoord");
    error.statusCode = 401; // voor gebruik in error handler
    throw error;
  }

  const secretKey = process.env.AUTH_SECRET_KEY
  console.log("secretKey:", secretKey)

  const token = jwt.sign({ userId: logins.id }, secretKey, { expiresIn: '1h' });
  console.log("token:", token)
  return token
};

export default login;