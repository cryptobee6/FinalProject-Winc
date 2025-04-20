import { Router } from 'express';
import login from '../services/login.js'

const router = Router();

router.post('/', async (req, res, next) => {
  const { username, password} = req.body;

  if(!username || !password ){
    return res.status(400).json({ message: 'more info required'})
  }

  try {
    const token = await login(username, password);
    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    next(error)
  }
})

export default router;
