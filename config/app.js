require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationHost: process.env.AUTHORIZATION_HOST,
  redirectUrl: process.env.REDIRECT_URL
};
