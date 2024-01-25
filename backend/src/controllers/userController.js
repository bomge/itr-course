const Users = require('../models/User');
const {genAccesToken,genRefreshToken, clearCookies} = require('../helpers/jwt')

const getAllUsers = async (req, res) => {
  const users = await Users.find().select('-password');
  if (!users) {
    return res.status(400).json({ message: 'No users found' });
  }
  res.json(users);
};

const checkMe = async (req, res) => {
  const { id } = req;
  if (!id) {
    clearCookies(res)
    return res
      .status(400)
      .json({ message: 'Verify your data and proceed again' });
  }

  const userDB = await Users.findById(id);
  if (userDB.status === 'banned') {
    clearCookies(res)
    return res
      .status(400)
      .json({ message: 'User is banned' })
      .redirect('/');
  }

  const accessToken =  genAccesToken(userDB);
  const refreshToken = genRefreshToken(userDB);

  res.json({ accessToken,refreshToken });
};

const banUsers = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !ids.length) {
    return res
      .status(400)
      .json({ message: 'Verify your data and proceed again' });
  }
  const updateUsersCount = await Users.updateMany(
    { _id: { $in: ids } },
    { status: 'banned' },
  );
  res.json({ message: `Banned ${updateUsersCount.modifiedCount} success` });
};
const UnbanUsers = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !ids.length) {
    return res
      .status(400)
      .json({ message: 'Verify your data and proceed again' });
  }
  const updateUsersCount = await Users.updateMany(
    { _id: { $in: ids } },
    { status: 'active' },
  );
  res.json({ message: `Unbanned ${updateUsersCount.modifiedCount} success` });
};

const deleteUsers = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !ids.length) {
    return res.status(400).json({ message: 'Check your input' });
  }

  const deleteUsers = await Users.deleteMany({ _id: { $in: ids } });
  res.json({ message: `Deleted ${deleteUsers.deletedCount} users` });
};

module.exports = {
  banUsers,
  UnbanUsers,
  getAllUsers,
  checkMe,
  deleteUsers,
};
