const { URL } = require('url');
const appConfig = require('../config/app');
const { post } = require('../routes/authorization');

const authorizationController = {
  login: (req, res) => {
    const authorizationUrl = `https://${
      appConfig.authorizationHost
    }/authorize?response_type=code&client_id=${
      appConfig.clientID
    }&redirect_uri=${encodeURIComponent(
      appConfig.redirectUrl
    )}&state=1234&scope=openid%profile%email`;

    res.redirect(authorizationUrl);
  },
  callback: async (req, res) => {
    const response = await fetch(`https://${appConfig.authorizationHost}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: appConfig.clientID,
        client_secret: appConfig.clientSecret,
        redirect_uri: appConfig.redirectUrl,
        scope: 'openid profile email',
        code: req.query.code
      })
    });

    const jsonResponse = await response.json();

    res.json(jsonResponse);
  }
};

module.exports = authorizationController;
