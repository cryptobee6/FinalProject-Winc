import viewAmenities from '../services/amenities/viewAmenities.js'
import createAmenity from '../services/amenities/createAmenity.js'
import deleteAmenity from '../services/amenities/deleteAmenity.js'
import updateAmenityById from '../services/amenities/updateAmenityById.js';
import express from "express";
import authMiddleware from '../middleware/auth.js';


const router = express.Router()

router.get('/', authMiddleware, (req, res) => {
    try {
      const amenities = viewAmenities()
      res.status(200).json(amenities)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while getting list of amenities!')
    }
  });

  router.post('/', (req, res) => {
    try {
      const { name } = req.body
      const newAmenity = createAmenity(name)
      res.status(201).json(newAmenity)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while creating new book!')
    }
  })


  router.put('/:id', (req, res) => {
    try {
      const { id } = req.params
      const { name } = req.body
      const updatedAmenity = updateAmenityById(
        id,
        name
      )
      res.status(200).json(updatedAmenity)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while updating book by id!')
    }
  })

  router.delete('/:id', (req, res) => {
    try {
      const { id } = req.params
      const deletedAmenityId = deleteAmenity(id)
  
      if (!deletedAmenityId) {
        res.status(404).send(`Book with id ${id} was not found!`)
      } else {
        res.status(200).json({
          message: `Book with id ${deletedAmenityId} was deleted!`
        })
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while deleting book by id!')
    }
  })
  



  export default router;