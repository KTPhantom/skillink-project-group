// config.js

require('dotenv').config();  // Load environment variables from .env file

const config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  apiBaseUrl: process.env.API_BASE_URL
};

module.exports = config;
