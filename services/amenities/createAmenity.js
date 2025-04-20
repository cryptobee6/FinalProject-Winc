import amenityData from '../../src/data/amenities.json' with { type: "json" };
import { v4 as uuid } from 'uuid'

const createAmenity = (name) => {
    const newAmenity = {
      id: uuid(),
      name
    }
  
    amenityData.users.push(newAmenity)
    return newAmenity
  }
  
  export default createAmenity