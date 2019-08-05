import { Router } from 'express';
import UserController from '../controllers/user';
import LocationController from '../controllers/location';
import Auth from '../utilities/auth';

const userController = new UserController();
const locationController = new LocationController();
const auth = new Auth();
const router = new Router();

/**
 * Endpoint to signup user
 */
router.post('/signup', userController.signup);

/**
 * Endpoint to login user
 */
router.post('/login', userController.login);

/**
 * Endpoint to send an SMS
 */
router.post('/:sender/sendSMS', auth.verifyToken, locationController.createLocation);

/**
 * Endpoint to get details of an SMS
 */
router.get('/:smsId/getSMS', auth.verifyToken, locationController.getLocations);

/**
 * Endpoint to get details of a contact
 */
router.get('/getContact', auth.verifyToken, locationController.updateLocation);

/**
 * Endpoint to delete a contact
 */
router.delete('/:name/deleteContact', auth.verifyToken, locationController.deleteLocation);

export default router;
