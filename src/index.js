import Express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsend from 'jsend';
import config from './config';
require('dotenv').config();

const ENV = process.env.NODE_ENV;
const STAGE = config[ENV];

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
app.use('/api/v1', routes);

app.listen(STAGE.PORT, () => {
  console.log(`Population Management System listening on port: http://localhost:${STAGE.PORT}`);
});

/**
 * Create a connection to the database.
 */
mongoose.connect(
  STAGE.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true }
);

export default app;
