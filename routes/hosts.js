import viewHosts from '../services/hosts/viewHosts.js'
import createHost from '../services/hosts/createHost.js'
import deleteHost from '../services/hosts/deleteHost.js'
import updateHostById from '../services/hosts/updateHostById.js';
import express from "express";
import authMiddleware from '../middleware/auth.js';
import getSingleHost from '../services/hosts/getSingleHost.js'


const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const {name} = req.query
        const hosts = await viewHosts(name)
        res.status(200).json(hosts)
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
      const host = await getSingleHost(id); // Haal de gebruiker op met de id
      if (!host) {
        // Als er geen gebruiker wordt gevonden, stuur een 404
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(host); // Retourneer de gebruiker als JSON
    } catch (error) {
      next(error); // Fout doorgeven aan de globale foutverwerker
    }
  });

  router.post('/', authMiddleware, async (req, res, next) => {
    const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body
    if(!username || !password || !name || !email || !phoneNumber || !profilePicture || !aboutMe){
        return res.status(400).json({ message: 'more info required'})
    }
    try {
      const newHost = await createHost( username, password, name, email, phoneNumber, profilePicture, aboutMe)
      console.log("newHost:", newHost)
      res.status(201).json(newHost)
    } catch (error) {
      next(error)
    }
  })


  router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const updateData = req.body
    try {
      const updatedHost = await updateHostById(id, updateData)
      res.status(200).json(updatedHost)      
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })

  router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params
      const deletedHostId = await deleteHost(id)
  
      if (!deletedHostId) {
        res.status(404).send(`Book with id ${id} was not found!`)
      } else {
        res.status(200).json({
          message: `Book with id ${deletedHostId} was deleted!`
        })
      }
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
      }

    }
  })
  



  export default router;