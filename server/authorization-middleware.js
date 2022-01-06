const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {

  const currentToken = req.headers['x-access-token'];
  if (!currentToken) {
    throw new ClientError(401, 'authentication required');
  }

  const pulledPayload = jwt.verify(currentToken, process.env.TOKEN_SECRET);

  req.user = pulledPayload;
  next();
}

module.exports = authorizationMiddleware;
