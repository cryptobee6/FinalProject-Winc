import amenityData from '../../src/data/amenities.json' with { type: "json" };
import { v4 as uuid } from 'uuid'



const deleteAmenity = (id) => {
  const index = amenityData.amenities.findIndex((amenity) => amenity.id === id)

  if (index === -1) {
    return null
  }

  amenityData.amenity.splice(index, 1)
  return id
}

export default deleteAmenity