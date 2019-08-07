import app from '../src';
import chai, { expect } from './setup';
import User from '../src/models/user';

describe('POST /signup', () => {
  const user = {
    "username": "TestUser",
    "email": "testuser@gmail.com",
    "password": "1234"
  }

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should sign up a user', async () => {
    const res = await chai.request(app)
      .post('/api/v1/signup')
      .send(user);
    expect(res).to.have.status(201);
    expect(res.body.data.message).to.equal('Successfully created account');
  });

  it('should not sign up an existing user', async () => {
    await User.create({
      "username": "TestUser",
      "email": "testuser@gmail.com",
      "password": "1234"
    });
    const res = await chai.request(app)
      .post('/api/v1/signup')
      .send(user);
    expect(res).to.have.status(409);
    expect(res.body.data.message).to.equal('Email used already exists, please login instead');
  });
});

describe('POST /login', () => {
  beforeEach(async () => {
    await User.create({
      username: "TestUser",
      email: "testuser@gmail.com",
      password: "1234"
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should login an existing user', async () => {
    const user = {
      "email": "testuser@gmail.com",
      "password": "1234"
    }
    const res = await chai.request(app)
      .post('/api/v1/login')
      .send(user);
    expect(res).to.have.status(200);
    expect(res.body.data.message).to.equal('Successfully logged in');
  });

  it('should not login a user that does not exist', async () => {
    const user = {
      "email": "test@gmail.com",
      "password": "1234"
    }
    const res = await chai.request(app)
      .post('/api/v1/login')
      .send(user);
    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('Account does not exist, please try again or sign up');
  });

  it('should not login a user with a wrong password', async () => {
    const user = {
      "email": "testuser@gmail.com",
      "password": "12345"
    }
    const res = await chai.request(app)
      .post('/api/v1/login')
      .send(user);
    expect(res).to.have.status(401);
    expect(res.body.data.message).to.equal('Wrong credentials, please try again or signup to create an account');
  });
});