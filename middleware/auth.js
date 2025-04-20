import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("process.env.AUTH_SECRET_KEY:", process.env.AUTH_SECRET_KEY)
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';
  console.log("secretKey:", secretKey)
  console.log("token:", token)
  if (!token) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }
    
  jwt.verify(token, secretKey, (err, decoded) => {
    
    if (err) {
      console.log("err:", err)
    return res.status(403).json({ message: 'Invalid token provided!' });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
