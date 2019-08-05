import jwt from 'jsonwebtoken';
import User from '..//models/user';

export default class Auth {
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });
  }
  
  verifyToken (req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) return next(error);
        Contact.findOne({ phoneNumber: decoded.id }, (error, user) => {
          if (!user) {
            return res.status(404).jsend.error({
              message: 'User not found',
            });
            return next(error);
          } else {
            req.loggedInUser = user;
            return next();
          }
        });
      });
    } else {
      return res.status(401).jsend.error({
        message: 'No access token',
      });
    }
  }
}
