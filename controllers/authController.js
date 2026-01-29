const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Render Login Page
// @route   GET /auth/login
// @access  Public
exports.getLoginPage = (req, res) => {
    res.render('pages/login');
};

// @desc    Auth User & Get Token
// @route   POST /auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            res.redirect('/dashboard');
        } else {
            res.render('pages/login', { error: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('pages/login', { error: 'Server Error' });
    }
};

// @desc    Logout User
// @route   GET /auth/logout
// @access  Private
exports.logoutUser = (req, res) => {
    try {
        // Delete uploaded files
        const uploadsDir = path.join(__dirname, '../public/uploads');
        if (fs.existsSync(uploadsDir)) {
            fs.rmSync(uploadsDir, { recursive: true, force: true });
            console.log('Uploads directory cleaned up');
        }
    } catch (err) {
        console.error('Error deleting uploads:', err);
    }

    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.redirect('/auth/login');
};
