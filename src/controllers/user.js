import mongoose from 'mongoose';
import User from '../models/user';
import Auth from '../utilities/auth';

const auth = new Auth();

export default class UserController {
  async signup(req, res) {
    const { body: { username, email, password } } = req;

    // check if contact already exists in the database
    const user = await User.findOne({ email: email })
    if (user) {
      return res.status(201).jsend.success({
        message: 'Email used already exists, please login instead',
      });
    }

    // generate Jwt Token for new user
    const token = auth.generateToken(password);

    // create Contact record in collection
    await User.create({
      username: username,
      email: email,
      password: password,
    });

    // return success response
    return res.status(201).jsend.success({
      message: 'Successfully created account',
      token: token
    });
  }

  async login(req, res) {
    const { body: { email, password } } = req;

    // verify user's password and generate Jwt token
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).jsend.error({
        message: 'Account does not exist, please try again or sign up',
      });
    }
    if (user.password === password) {
      const token = auth.generateToken(password);
      return res.status(200).jsend.success({
        message: 'Successfully logged in',
        token: token
      });
    }

    // return error message if password is wrong
    return res.status(401).jsend.success({
      message: 'Wrong credentials, please try again or signup to create an account',
    });
  }
}
