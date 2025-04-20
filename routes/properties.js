import viewProperties from '../services/properties/viewProperties.js'
import createProperty from '../services/properties/createProperty.js'
import deleteProperty from '../services/properties/deleteProperty.js'
import updatePropertyById from '../services/properties/updatePropertyById.js';
import express from "express";
import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import getPropertiesHosts from '../services/properties/getPropertyHost.js';
import notFoundErrorHandler from '../middleware/errorHandler.js';
import { auth } from 'express-oauth2-jwt-bearer';
import getSingleProperty from '../services/properties/getSingleProperty.js';


const router = Router()

router.get('/', async (req, res) => {
    try {
      const {location, pricePerNight} = req.query
      console.log("location:", location)
      console.log("pricePerNight:", pricePerNight)
      const properties = await viewProperties(location, pricePerNight)
      
      res.status(200).json(properties)
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
      const property = await getSingleProperty(id); // Haal de gebruiker op met de id
      if (!property) {
        // Als er geen gebruiker wordt gevonden, stuur een 404
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(property); // Retourneer de gebruiker als JSON
    } catch (error) {
      next(error); // Fout doorgeven aan de globale foutverwerker
    }
  });

router.get('/:id/hosts', async (req, res, next) => {
    try {
      const { id } = req.params
      const getPropertyHost = await getPropertiesHosts(id)


      res.status(200).json(getPropertyHost)
    } catch (error) {
      next(error)
    }
  },
  notFoundErrorHandler
)


  router.post('/', authMiddleware, async (req, res, next) => {
    const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body
    
    if(!title || !description || !location || !pricePerNight || !bedroomCount || !bathRoomCount || !maxGuestCount || !hostId || !rating){
        return res.status(400).json({ message: 'more info required'})
    }
    try {
      
      const newProperty = await createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating)
      res.status(201).json(newProperty)
    } catch (error) {
        next(error)
    }
  })


  router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const updateData = req.body
    console.log("id", id)
    console.log("updateData", updateData)
    try {
      const updatedProperty = await updatePropertyById(id, updateData)
      console.log("updatedProperty:", updatedProperty)
      res.status(200).json(updatedProperty)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while updating book by id!')
    }
  })

  router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    try {
      const deletedPropertyId = await deleteProperty(id)
      res.status(200).json({message: `Property with id ${deletedPropertyId} was deleted!`
      })
     
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while deleting book by id!')
    }
  })
  



  export default router;