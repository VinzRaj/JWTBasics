const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
  const { username, password } = req.body;

  //mongoose validation(in schema set it as required field)
  //joi
  //check in the controller
  if (!username || !password) {
    throw new CustomAPIError('please provide username and password', 400);
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWTSECREYKEY, {
    expiresIn: '30d',
  });
  res.status(200).json({ msg: 'login created', token });
};

const dashboard = async (req, res) => {
  //token verification done in middileware (auth.js)
  res.status(200).json({ message: `Hello,${req.user.username}` });
};
module.exports = {
  login,
  dashboard,
};
