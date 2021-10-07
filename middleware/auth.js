const jwt = require('jsonwebtoken');
const config = require('config');
const jwtPrivateKey = config.get('jwt_private_key');


function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({message: "Acces denied."});
  }
  // const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
}

module.exports = auth;
