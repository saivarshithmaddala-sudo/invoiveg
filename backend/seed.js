const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Check if Admin exists
        const adminExists = await User.findOne({ email: 'admin@akshara.in' });
        
        if (adminExists) {
            console.log('Admin user already exists. Ready to use!');
            process.exit(0);
        }

        // Create Admin
        const adminUser = await User.create({
            name: 'Akshara Admin',
            email: 'admin@akshara.in',
            password: 'Admin@123',
            role: 'admin'
        });

        console.log('SUCCESS: Admin User Created Successfully!');
        console.log('Email: admin@akshara.in');
        console.log('Password: Admin@123');
        
        process.exit(0);
    } catch (error) {
        console.error('ERROR SEEDING ADMIN:', error);
        process.exit(1);
    }
};

seedAdmin();
