require('dotenv').config();

const config = {
  testing: {
    PORT: process.env.TESTING_APP_PORT,
    DATABASE_URL: process.env.TESTING_DB_URL,
    SECRET: process.env.SECRET
  },
  development: {
    PORT: process.env.DEVELOPMENT_APP_PORT,
    DATABASE_URL: process.env.DEVELOPMENT_DB_URL,
    SECRET: process.env.SECRET
  },
  production: {
    PORT: process.env.PRODUCTION_APP_PORT,
    DATABASE_URL: process.env.PRODUCTION_DB_URL,
    SECRET: process.env.SECRET
  },
};

export default config;
