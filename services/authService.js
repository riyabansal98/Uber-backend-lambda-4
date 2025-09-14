const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');

function signToken(userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        issuer: process.env.JWT_ISSUER || 'uber-backend',
        audience: process.env.JWT_AUDIENCE || 'uber-clients',
      }
    );
}
  
async function register(userData) {
    const user = await userRepo.create(userData);
    const token = signToken(user._id.toString());
    return { user, token };
}
  
async function login({ email, password }) {
    const user = await userRepo.findByEmail(email);
    const ok = user && (await user.comparePassword(password));
    if (!ok) {
        throw new Error('Invalid email or password');
    }
    const token = signToken(user._id.toString());
    return { user, token };
}

module.exports = { register, login };