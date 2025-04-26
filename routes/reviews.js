import viewReviews from '../services/reviews/viewReviews.js'
import createReview from '../services/reviews/createReview.js'
import deleteReview from '../services/reviews/deleteReview.js'
import updateReviewById from '../services/reviews/updateReviewById.js';
import express from "express";
import authMiddleware from '../middleware/auth.js';
import { Router } from 'express';
import getSingleReview from '../services/reviews/getSingleReview.js';


const router = Router()

router.get('/', async (req, res) => {
  const {id} = req.query
  console.log("reviewId", id)
    try {
      const reviews = await viewReviews(id)
      res.status(200).json(reviews)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while getting list of reviews!')
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;  // Haal de 'id' parameter uit de URL
    
    if (!id) {
      // Controleer of de id wel is meegegeven, anders geef een foutmelding
      return res.status(400).json({ message: 'id is missing' });
    }
  
    try {
      const review = await getSingleReview(id); // Haal de gebruiker op met de id
      if (!review) {
        // Als er geen gebruiker wordt gevonden, stuur een 404
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(review); // Retourneer de gebruiker als JSON
    } catch (error) {
      next(error); // Fout doorgeven aan de globale foutverwerker
    }
  });

  router.post('/', authMiddleware, async (req, res, next) => {
    const { userId, propertyId, rating, comment } = req.body
    if(!userId || !propertyId || !rating || !comment){
        return res.status(400).json({ message: 'more info required'})
    }
    try {
      const newReview = await createReview(userId, propertyId, rating, comment)
      res.status(201).json(newReview)
    } catch (error) {
      next(error)
    }
  })


  router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const updateData = req.body
    try {
      const updatedReview = await updateReviewById(id, updateData)
      res.status(200).json(updatedReview)
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })

  router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    try {
      
      console.log("id", id)
      const deletedReviewId = await deleteReview(id)
      console.log("deletedReview:", deleteReview)
      if (!deletedReviewId) {
        res.status(404).send(`Book with id ${id} was not found!`)
      } else {
        res.status(200).json({
          message: `Book with id ${deletedReviewId} was deleted!`
        })
      }
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })
  



  export default router;