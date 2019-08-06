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
 * Endpoint to create a location
 */
router.post('/createLocation', auth.verifyToken, locationController.createLocation);

/**
 * Endpoint to get all available locations
 */
router.get('/getLocations', auth.verifyToken, locationController.getLocations);

/**
 * Endpoint to update data of a location
 */
router.put('/:locationId/updateLocation', auth.verifyToken, locationController.updateLocation);

/**
 * Endpoint to delete a location
 */
router.delete('/:locationId/deleteLocation', auth.verifyToken, locationController.deleteLocation);

export default router;
