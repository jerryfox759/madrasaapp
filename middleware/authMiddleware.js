const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            res.clearCookie('token');
            return res.redirect('/auth/login');
        }

        next();
    } catch (error) {
        console.error(error);
        res.clearCookie('token');
        return res.redirect('/auth/login');
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Not Authorized as Admin');
    }
};

module.exports = { protect, adminOnly };
