const User = require('../models/user');

async function create(userData) {
  const user = new User(userData);
  await user.save();
  return user;
}

async function findByEmail(email) {
  return User.findOne({ email });
}

const updateLocation = async (driverId, location) => {
  return User.findByIdAndUpdate(driverId, { location }, { new: true });
};

module.exports = { create, findByEmail, updateLocation };