import mongoose from 'mongoose';

/**
 * Schema for the Location collection
 */
const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  male: { 
    type: Number,
  },
  female: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  }
});

const Locations = mongoose.model('Location', LocationSchema);

export default Locations;
