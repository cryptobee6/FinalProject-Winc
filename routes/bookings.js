import viewBookings from '../services/bookings/viewBookings.js'
import createBooking from '../services/bookings/createBooking.js'
import deleteBooking from '../services/bookings/deleteBooking.js'
import updateBookingById from '../services/bookings/updateBookingById.js';
import express from "express";
import authMiddleware from '../middleware/auth.js';
import getSingleBooking from '../services/bookings/getSingleBooking.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const {userId} = req.query
        console.log("userId:", userId)
      const bookings = await viewBookings(userId)
      res.status(200).json(bookings)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while getting list of bookings!')
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;  // Haal de 'id' parameter uit de URL
    
    if (!id) {
      // Controleer of de id wel is meegegeven, anders geef een foutmelding
      return res.status(400).json({ message: 'id is missing' });
    }
  
    try {
      const booking = await getSingleBooking(id); // Haal de gebruiker op met de id
      if (!booking) {
        // Als er geen gebruiker wordt gevonden, stuur een 404
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(booking); // Retourneer de gebruiker als JSON
    } catch (error) {
      next(error); // Fout doorgeven aan de globale foutverwerker
    }
  });

  router.post('/', authMiddleware, async (req, res, next) => {
      const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body
      if(!userId || !propertyId || !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice || !bookingStatus){
        return res.status(400).json({ message: 'more info required'})
        }

      try{
        const newBooking = await createBooking(userId, propertyId, checkinDate, checkoutDate,numberOfGuests, totalPrice, bookingStatus)
      res.status(201).json(newBooking)
    } catch (error) {
      next(error)
    }
  })


  router.put('/:id', authMiddleware, async (req, res) => {
      const { id } = req.params
      const updateData = req.body
      
      try {
      const updatedBooking = await updateBookingById( id, updateData )
      res.status(200).json(updatedBooking)
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })

  router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    try {
      const deletedBookingId = await deleteBooking(id)
      res.status(200).json({message: `Book with id ${deletedBookingId} was deleted!`
      })
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })
  



  export default router;