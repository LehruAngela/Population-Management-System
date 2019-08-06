import mongoose from 'mongoose';

/**
 * Schema for the Location collection
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
