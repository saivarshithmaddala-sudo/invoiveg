const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const invoiceRoutes = require('./routes/invoiceRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

// Configure environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Higher limit for Base64 logo uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/products', productRoutes);

// Add health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
