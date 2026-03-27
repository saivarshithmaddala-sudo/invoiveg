const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Prevent registering as admin if not authorized (Simplified for demo)
        const userCount = await User.countDocuments();
        const finalRole = userCount === 0 ? 'admin' : role; // First user is Admin

        const user = await User.create({ name, email, password, role: finalRole });
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        next(error);
    }
};

// Login User
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing credentials' });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        next(error);
    }
};
