const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {genAccesToken,genRefreshToken} = require('../helpers/jwt')

const SALT_ROUNDS = +process.env.SALT_ROUNDS


const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  const foundUser = await Users.findOne({ email});
  if (!foundUser) {
    return res.status(401).json({ message: 'Not found user' });
  }
  const matchPassword =   await bcrypt.compare(password, foundUser.password);
  if (!matchPassword) {
    return res.status(401).json({ message: 'Wrong Pass ' });
  }
  if (foundUser.status === 'banned') {
    return res.status(401).json({ message: 'User is banned' });
  }

  const accessToken = genAccesToken(foundUser);
  const refreshToken = genRefreshToken(foundUser);


  res.json({ accessToken,refreshToken });
};

const register = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  const foundUser = await Users.findOne({ email }, {});
  if (foundUser) {
    return res.status(401).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const createdUser = await Users.create({ email, password:hashedPassword, name });
  
  const accessToken = genAccesToken(createdUser);
  const refreshToken = genRefreshToken(createdUser);

  res.json({ accessToken,refreshToken });
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.refresh_token
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized (no jwt)' });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden (cant verify jцt)' });
      }
      const foundUser = await Users.findById(decoded.userInfo.id);
      if (!foundUser) {
        return res.status(403).json({ message: 'Unauthorized (bad jwt user)' });
      }
      const accessToken =  genAccesToken(foundUser);
      const refreshToken = genRefreshToken(foundUser);


      res.json({ accessToken,refreshToken });
    }
  );
};

const logout = async (req, res) => {
  const cookies = req?.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content
  }
  return res.sendStatus(200)
};

module.exports = { login, refresh, logout, register };
