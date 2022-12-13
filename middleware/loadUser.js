const appConfig = require('../config/app');
const User = require('../models/user');

const loadUser = async (req, res, next) => {
  try {
    // If there is no Authorization header with a token, we can't
    // load a user
    if (!req.headers.authorization) next();

    // Parse the token out of the authorization header
    const token = parseToken(req);

    // Fetch the user's info from auth0 by making a GET
    // request to auth0 with the access token in
    // the authorization header
    const authZeroUser = await fetchAuthZeroUser(token);

    // Lookup the user in _our_ database based on the
    // user info we got back from Auth0.
    //
    // If no User exists in our database yet, create
    // one and return it!
    const user = await findOrCreateUser(authZeroUser);

    // Now we have a user. Set it on the request so we
    // can access it in controllers \o/
    req.user = user;

    next();
  } catch (_error) {
    next();
  }
};

const findOrCreateUser = async (authZeroUserJson) => {
  if (!authZeroUserJson) return;

  const existingUser = await User.findOne({ identifier: authZeroUserJson.sub });

  if (existingUser) return existingUser;

  // No user exists in _our_ DB yet, Let's create one with the info
  // we got from Auth0!
  const newUser = await User.create({
    identifier: authZeroUserJson.sub,
    email: authZeroUserJson.email,
    givenName: authZeroUserJson.given_name,
    familyName: authZeroUserJson.family_name,
    locale: authZeroUserJson.locale,
    picture: authZeroUserJson.picture
  });

  return newUser;
};

const fetchAuthZeroUser = async (token) => {
  // Get the user from Auth0, which is where we've stored user profiles
  const response = await fetch(`${appConfig.authorizationHost}/userinfo`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.json();
};

const parseToken = (req) => {
  // Parse out the token. The token is in the Authorization header like this:
  // Authorization: Bearer <token>

  return req.headers.authorization.split(' ')[1];
};

module.exports = loadUser;
