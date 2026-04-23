const app = require('../server.js');
const connectDB = require('../config/db');

let isConnected = false;

module.exports = async (req, res) => {
    if (!process.env.MONGO_URI) {
        console.error("CRITICAL: MONGO_URI is not set in Vercel Environment Variables!");
    }
    
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    
    return app(req, res);
};
