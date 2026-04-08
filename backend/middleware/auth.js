const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return res.status(401).json({ message: 'No user found with this id' });
        }
        
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is invalid' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        // Correctly check if user's role is in the authorized roles list
        // Admin always has access to everything
        if (req.user.role === 'admin' || roles.includes(req.user.role)) {
            return next();
        }
        
        return res.status(403).json({ message: `User role ${req.user.role} is not authorized` });
    };
};
