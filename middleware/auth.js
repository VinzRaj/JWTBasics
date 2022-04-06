const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const authenticationMiddileware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer'))
    throw new CustomAPIError('token not provided ', 401);
  const token = authHeader.split(' ')[1];
  try {
    const decodeed = jwt.verify(token, process.env.JWTSECREYKEY);
    const { id, username } = decodeed;
    req.user = { id, username };
    next();
  } catch {
    throw new CustomAPIError('token not mtaching', 401);
  }
};

module.exports = authenticationMiddileware;
