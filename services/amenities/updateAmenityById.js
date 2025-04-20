import amenityData from '../../src/data/amenities.json' with { type: "json" };
import { v4 as uuid } from 'uuid'

const updateAmenityById = (id, name) => {
    const amenity = amenityData.amenities.find((amenity) => amenity.id === id)
  
    if (!amenity) {
      throw new Error(`Book with id ${id} was not found!`)
    }

    amenity.name = name ?? amenity.name
  
    return amenity
  }
  
  export default updateAmenityById