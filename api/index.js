const app = require('../backend/server.js');
const connectDB = require('../backend/config/db');

// Ensure DB is connected for serverless environment
let isConnected = false;

module.exports = async (req, res) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    return app(req, res);
};

