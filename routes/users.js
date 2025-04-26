import getUsers from '../services/users/getUsers.js'
import createUser from '../services/users/createUser.js'
import deleteUser from '../services/users/deleteUser.js'
import updateUserById from '../services/users/updateUserById.js';
import getSingleUser  from '../services/users/getSingleUser.js'
import getUserWithReviews from '../services/users/getUserWithReviews.js';
import getUsername from '../services/users/getUserName.js';
import express from "express";
import authMiddleware from '../middleware/auth.js';
import { Router } from "express"


const router = Router();



  router.get('/', async (req, res, next) => {
    const {username} = req.query
    console.log("username:", username)
    try {
      const users = await getUsers(username)
      res.status(200).json(users)
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }
      next(error)
    }
  });


  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;  // Haal de 'id' parameter uit de URL
    
    if (!id) {
      // Controleer of de id wel is meegegeven, anders geef een foutmelding
      return res.status(400).json({ message: 'id is missing' });
    }
  
    try {
      const user = await getSingleUser(id); // Haal de gebruiker op met de id
      if (!user) {
        // Als er geen gebruiker wordt gevonden, stuur een 404
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user); // Retourneer de gebruiker als JSON
    } catch (error) {
      next(error); // Fout doorgeven aan de globale foutverwerker
    }
  });




  router.post('/', authMiddleware, async (req, res, next) => {
    const { username, password, name, email, phoneNumber, profilePicture } = req.body;

    if( !username || !password || !name || !email || !phoneNumber || !profilePicture ){
      return res.status(400).json({ message: 'more info required'})
    }

    try {
      const newUser = await createUser( username, password, name, email, phoneNumber, profilePicture);
      console.log("newUser:", newUser)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  })


  // router.get('/', async (req, res) => {
  //   const { username } = req.query;
  //   if (!username) {
  //     return res.status(400).json({ message: 'Username is required' });
  //   }
  //   try {
  //     const username1 = await getUsername(username);
  //     if (username1){  
  //     res.status(200).json(username1); // Retourneer de gebruiker en berichten
  //   } else {
  //     res.status(404).json({ message: `Gebruiker met username ${username} niet gevonden` });
  //   }
  // } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Something went wrong' });
  //   }
  // });


  router.get('/:id/reviews', async (req, res) => {
    const { id } = req.params; // Haal het userId uit de URL parameters
  
    try {
      const userWithReviews = await getUserWithReviews(id); // Gebruik de service om de gebruiker en berichten op te halen
  
      if (!userWithReviews) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(userWithReviews); // Retourneer de gebruiker en berichten
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


  router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const updateData = req.body
    
    try {    
      const updatedUser = await updateUserById(id, updateData) 
      res.status(200).json(updatedUser)
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })

  router.delete('/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params
    try {
      const deletedUserId = await deleteUser(userId)
      res.status(200).json({message: `user with id ${deletedUserId} was deleted!`
      })

    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })
  



  export default router;

