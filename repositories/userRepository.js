const User = require('../models/user');

async function create(userData) {
  const user = new User(userData);
  await user.save();
  return user;
}

async function findByEmail(email) {
  return User.findOne({ email });
}

module.exports = { create, findByEmail };