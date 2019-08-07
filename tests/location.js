import app from '../src';
import chai, { expect } from './setup';
import Locations from '../src/models/location';
import User from '../src/models/user';

const signup = async () => {
  const user = {
    "username": "TestUser",
    "email": "testuser@gmail.com",
    "password": "1234"
  }
  const res = await chai.request(app).post('/api/v1/signup').send(user)
  return res;
};

describe('POST /location', () => {
  const location = {
    "name": "Area51",
    "male": "40",
    "female": "70"
  }
  afterEach(async () => {
    await Locations.deleteMany({});
    await User.deleteMany({});
  });

  it('should create a new location', async () => {
    try {
      const user = await signup();
      return user;
    } catch (error) {
      throw new Error(error);
    }
    
    const res = await chai.request(app)
      .post('/api/v1/createLocation')
      .set('Authorization', user.body.data.token)
      .send(location);
    expect(res).to.have.status(201);
    expect(res.body.data.message).to.equal('Successfully created location');
  });
});

describe('GET /locations', () => {
  beforeEach(async () => {
    await Locations.create({
      name: "Area51",
      male: "40",
      female: "70",
      total: "110"
    });
    await Locations.create({
      name: "Area52",
      male: "40",
      female: "70",
      total: "110"
    });
    await Locations.create({
      name: "Area53",
      male: "40",
      female: "70",
      total: "110"
    });
  });
  afterEach(async () => {
    await Locations.deleteMany({});
    await User.deleteMany({});
  });

  it('gets all available locations', async () => {
    try {
      const user = await signup();
      return user;
    } catch (error) {
      throw new Error(error);
    }

    const res = await chai.request(app)
      .post('/api/v1/getLocations')
      .set('Authorization', user.body.data.token)
      .send(location);
    expect(res).to.have.status(200);
    expect(res.body.data.locations.length).to.equal(3);
  })
});

describe('PUT /location/:locationId', () => {
  let location;

  beforeEach(async () => {
    location = await Locations.create({
      name: "Area51",
      male: "40",
      female: "70",
      total: "110"
    });
  });

  const updatedLocation = {
    name: "Area52",
    male: "50",
    female: "60"
  }

  afterEach(async () => {
    await Locations.deleteMany({});
    await User.deleteMany({});
  });

  it('updates data for a specific location', async () => {
    try {
      const user = await signup();
      return user;
    } catch (error) {
      throw new Error(error);
    }

    const res = await chai.request(app)
      .put(`/api/v1/location/${location._id}`)
      .set('Authorization', user.body.data.token)
      .send(updatedLocation);
    expect(res).to.have.status(200);
    expect(res.body.data.location.name).to.equal(updatedLocation.name);
    expect(res.body.data.location.male).to.equal(updatedLocation.male);
    expect(res.body.data.location.female).to.equal(updatedLocation.female);
  })
});

describe('DELETE /location/:locationId', () => {
  let location;

  beforeEach(async () => {
    location = await Locations.create({
      name: "Area51",
      male: "40",
      female: "70",
      total: "110"
    });
  });

  afterEach(async () => {
    await Locations.deleteMany({});
    await User.deleteMany({});
  });

  it('deletes a specified location', async () => {
    try {
      const user = await signup();
      return user;
    } catch (error) {
      throw new Error(error);
    }

    const res = await chai.request(app)
      .delete(`/api/v1/location/${location._id}`)
      .set('Authorization', user.body.data.token)
    expect(res).to.have.status(200);
    expect(res.body.data.name).to.equal(location.name);
  });
});

