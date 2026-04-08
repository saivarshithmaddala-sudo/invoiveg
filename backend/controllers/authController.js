const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(`DEBUG: Registering user: ${email}`);
        
        // Prevent registering as admin if not authorized (Simplified for demo)
        const userCount = await User.countDocuments();
        const finalRole = userCount === 0 ? 'admin' : role; // First user is Admin

        const user = await User.create({ name, email, password, role: finalRole });
        console.log(`DEBUG: User created successfully: ${user.email}`);
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        console.error(`DEBUG: Registration error: ${error.message}`);
        next(error);
    }
};

// Login User
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(`DEBUG: Login attempt: ${email}`);
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing credentials' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`DEBUG: No user found with email: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log(`DEBUG: Password mismatch for: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(`DEBUG: Login successful for: ${email}`);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
        console.error(`DEBUG: Login error: ${error.message}`);
        next(error);
    }
};
