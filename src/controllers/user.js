import mongoose from 'mongoose';
import User from '../models/user';
import Auth from '../utilities/auth';

const auth = new Auth();

export default class UserController {
  async signup(req, res) {
    const { body: { name, male, female } } = req;

    // check if contact already exists in the database
    const contact = await Contact.findOne({ phoneNumber: phoneNumber })
    if (contact) {
      return res.status(201).jsend.success({
        message: 'Phone number already exists, please login instead',
      });
    }

    // generate Jwt Token for new user
    const token = auth.generateToken(phoneNumber);

    // create Contact record in collection
    await Contact.create({
      name: name,
      phoneNumber: phoneNumber,
      password: password,
    });
    
    // return success response
    return res.status(201).jsend.success({
      message: 'Successfully created contact',
      name: name,
      phoneNumber: phoneNumber,
      token: token,
    });
  }

  async login(req, res) {
    const { body: { phoneNumber, password } } = req;

    // verify user's password and generate Jwt token
    const contact = await Contact.findOne({ phoneNumber: phoneNumber })
    if (contact.password === password) {
      const token = auth.generateToken(phoneNumber);
      return res.status(200).jsend.success({
        message: 'Successfully logged in, you can now send messages',
        token: token
      });
    }

    // return error message if password is wrong
    return res.status(401).jsend.success({
        message: 'Wrong credentials, please try again or signup to create an account',
    });
  }
}
