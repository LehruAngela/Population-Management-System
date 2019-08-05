import mongoose from 'mongoose';

/**
 * Schema for the Location collection
 */
const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);

export default User;
