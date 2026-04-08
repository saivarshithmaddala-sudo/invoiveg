const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    
    // Intercept MongoDB SSL/TLS IP Whitelist Error
    if (message && (message.includes('SSL routines') || message.includes('alert number 80'))) {
        statusCode = 503;
        message = 'Database Connection Failed: Your current IP Address has changed and is not whitelisted in MongoDB Atlas. Please go to MongoDB Atlas -> Network Access and add your current IP.';
    }

    res.status(statusCode);
    res.json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;
