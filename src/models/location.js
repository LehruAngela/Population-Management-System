import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

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
  },
  parentLocation: {
    type: ObjectId
  }
});

const Locations = mongoose.model('Location', LocationSchema);

export default Locations;
