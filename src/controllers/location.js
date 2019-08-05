import mongoose from 'mongoose';
import Locations from '../models/location';
import User from '../models/user';
import Auth from '../utilities/auth';

const auth = new Auth();

export default class LocationController {
  async createLocation(req, res) {
    const { body: { name, male, female } } = req;

    // check if location already exists in the database
    const location = await Contact.findOne({ name: name })
    if (location) {
      return res.status(409).jsend.error({
        message: 'Location already exists, use a different name',
      });
    }

    // create Location record in collection
    await Locations.create({
      name: name,
      phoneNumber: phoneNumber,
      password: password,
    });

    // return success response
    return res.status(201).jsend.success({
      message: 'Successfully created location',
      name: name,
      male: male,
      female: female,
    });
  }

  async getLocations(req, res) {
    const locations = await Locations.find();

    // return success response
    return res.status(200).jsend.success({
      locations
    });
  }

  async updateLocation(req, res) {
    const { params: { locationId } } = req;
    const { body: { name, male, female } } = req;
    const location = await Locations.findOne({ name: name });

    // update Location record from the collection
    // await Locations.remove({ _id: location._id });

    // return success response
    return res.status(200).jsend.success({
      message: 'Successfully update location',
      location
    });
  }

  async deleteLocation(req, res) {
    const { params: { name } } = req;
    const location = await Locations.findOne({ name: name })

    // remove Location record from the collection
    await Locations.remove({ _id: location._id });

    // return success response
    return res.status(200).jsend.success({
      message: 'Successfully deleted location',
      name: location.name,
    });
  }
}
