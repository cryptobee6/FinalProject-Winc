import viewAmenities from '../services/amenities/viewAmenities.js'
import createAmenity from '../services/amenities/createAmenity.js'
import deleteAmenity from '../services/amenities/deleteAmenity.js'
import updateAmenityById from '../services/amenities/updateAmenityById.js';
import express from "express";
import authMiddleware from '../middleware/auth.js';
import getSingleAmenity from '../services/amenities/getSingleAmenity.js';


const router = express.Router()

router.get('/', async (req, res) => {
    try {
      const {name} = req.query
      const amenities = await viewAmenities(name)
      res.status(200).json(amenities)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while getting list of amenities!')
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;  // Haal de 'id' parameter uit de URL
    
    if (!id) {
      // Controleer of de id wel is meegegeven, anders geef een foutmelding
      return res.status(400).json({ message: 'id is missing' });
    }
  
    try {
      const amenity = await getSingleAmenity(id); // Haal de gebruiker op met de id
      if (!amenity) {
        // Als er geen gebruiker wordt gevonden, stuur een 404
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(amenity); // Retourneer de gebruiker als JSON
    } catch (error) {
      next(error); // Fout doorgeven aan de globale foutverwerker
    }
  });

  router.post('/', authMiddleware, async (req, res, next) => {
    const { name } = req.body
    if(!name){
      return res.status(400).json({ message: 'more info required'})
    }
    try {
      const newAmenity = await createAmenity(name)
      res.status(201).json(newAmenity)
    } catch (error) {
      next(error)
    }
  })


  router.put('/:id', authMiddleware, async (req, res) => {

      const { id } = req.params
      const updateData = req.body

      try{
      const updatedAmenity = await updateAmenityById(id, updateData)
      res.status(200).json(updatedAmenity)
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }
      console.error(error)
      res.status(500).send('Something went wrong while updating Amenity by id!')
    }
  })

  router.delete('/:id', authMiddleware, async (req, res) => {
    try {
    const { id } = req.params
    const deletedAmenityId = await deleteAmenity(id)
    if (!deletedAmenityId){
      res.status(404).send(`Amenity with id ${id} was not found!`)
    } else {
      res.status(200).json({
        message: `Amenity with id ${id} was deleted`
      })
    }      
   } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
      console.error(error)
      res.status(500).send('Something went wrong while deleting amenity by id!')
    }
  })




  export default router;