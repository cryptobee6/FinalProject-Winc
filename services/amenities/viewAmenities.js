import amenities from '../../src/data/amenities.json' with { type: "json" };
import { v4 as uuid } from 'uuid'

const viewAmenities = () => {
  return amenities;
}

export default viewAmenities;