const app = require('../server.js');
const connectDB = require('../config/db');

let isConnected = false;

module.exports = async (req, res) => {
    // Ensure MONGO_URI is present
    if (!process.env.MONGO_URI) {
        console.error("CRITICAL: MONGO_URI is not set in Vercel Environment Variables!");
        return res.status(500).json({ error: "Database configuration missing" });
    }
    
    // Connect to database if not already connected
    if (!isConnected) {
        try {
            await connectDB();
            isConnected = true;
        } catch (err) {
            console.error("Database connection failed:", err);
            return res.status(500).json({ error: "Database connection failed" });
        }
    }
    
    // Handle the request with the Express app
    return app(req, res);
};
