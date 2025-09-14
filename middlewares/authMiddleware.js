const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(verified.id);
        next();
    }catch{
        res.status(400).send('Invalid Token');
    }
}

module.exports = authMiddleware;