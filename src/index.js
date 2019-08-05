import Express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsend from 'jsend';
require('dotenv').config();

const app = new Express();

/**
 * Register essential middleware
 * for express app
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(jsend.middleware);

/**
 * Register the routes
 */
app.use('/', routes);

app.listen(8001, () => {
  console.log('Population Management System listening on port: http://localhost:8001');
});

/**
 * Create a connection to the database.
 */
mongoose.connect(
  'mongodb://localhost/population-system',
  { useNewUrlParser: true, useCreateIndex: true }
);

export default app;
