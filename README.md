# Population Management System
This is an API written in NodeJS, Express.js framework using MongoDB as the data store. The endpoints mentioned below allow a user to signup to create an account and login to aceess the features/functionality of the system.

## Features
1. Creating a new location containing data on the total number of male and female residents within it.
2. Listing all available locations and their population summaries.
3. Updating data for a specific location.
4. Deleting a specified location.

## Set-up
To get the project up and running, clone the project;
1. To install all the dependencies of the project, run the command below; 
```
npm install
```
2. To start the node server;
```
npm run start:dev
```
3. To build the project;
```
npm run build
```
4. To set up the environment variables, create a .env file and add the variables in the .env.example

5. To run tests;
```
npm test
```

## Documentation
| Type | API Endpoint | Functionality | 
| --- | --- | --- | 
| POST | /api/v1/signup | Endpoint to signup user | 
| POST | /api/v1/login | Endpoint to login user | 
| POST | /api/v1/location | Endpoint to create a location | 
| GET | /api/v1/locations | Endpoint to get all available locations | 
| PUT | /api/v1/location/:locationId | Endpoint to update data for a specific location | 
| DELETE | /api/v1/location/:locationId | Endpoint to delete a specified location | 

### POST /api/v1/signup
```
{
    "username": "TestUser",
	"email": "testuser@gmail.com",
	"password": "1...."
}
```

### POST /api/v1/login
```
{ 
    "email": "testuser@gmail.com",
	"password": "1...."
}
```

### POST /api/v1/location
```
{
    "name": "Area1",
	"male": "40",
	"female": "40"
}
```

### PUT api/v1/location/:locationId/
```
{
    "name": "Area1",
	"male": "40",
	"female": "50"
}
```