import mongoose from 'mongoose';
import Locations from '../models/location';
import User from '../models/user';
import Auth from '../utilities/auth';

const auth = new Auth();

export default class LocationController {
  async createLocation(req, res) {
    const { body: { name, male, female } } = req;

    // check if location already exists in the database
    const location = await Locations.findOne({ name: name })
    if (location) {
      return res.status(409).jsend.error({
        message: 'Location already exists',
      });
    }

    // create Location record in collection
    await Locations.create({
      name: name,
      male: male,
      female: female,
      total: Number(male) + Number(female)
    });

    // return success response
    return res.status(201).jsend.success({
      message: 'Successfully created location',
      name: name,
      male: male,
      female: female,
      total: String(Number(male) + Number(female))
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
    const location = await Locations.findOne({ _id: locationId });

    if (!location) {
      return res.status(404).jsend.error({
        message: 'Location ID provided doesnt map to any location',
      });
    }

    // update Location record from the collection
    if (name) {
      location.name = name;
    }
    if (male) {
      location.male = male;
      location.total = male + location.female;
    }
    if (female) {
      location.female = female;
      location.total = female + location.male;1
    }
    await location.save();

    // return success response
    return res.status(200).jsend.success({
      message: 'Successfully updated location',
      location
    });
  }

  async deleteLocation(req, res) {
    const { params: { locationId } } = req;

    const location = await Locations.findOne({ _id: locationId});
    if (!location) {
      return res.status(404).jsend.error({
        message: 'Location does not exist',
      });
    }

    // remove Location record from the collection
    await Locations.deleteOne({ _id: locationId });

    // return success response
    return res.status(200).jsend.success({
      message: 'Successfully deleted location',
      name: location.name,
    });
  }
}
