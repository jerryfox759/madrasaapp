require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// Connect to Database
connectDB().then(async () => {
    // Auto-seed if empty
    try {
        const User = require('./models/User');
        if (await User.countDocuments() === 0) {
            console.log('Database empty. Seeding data...');
            const Student = require('./models/Student');
            const Teacher = require('./models/Teacher');
            const Salary = require('./models/Salary');

            // Create Admin & Staff
            await User.create({ username: 'admin', password: 'password123', role: 'admin' });
            await User.create({ username: 'staff', password: 'staff123', role: 'staff' });

            // Teachers
            const teachers = await Teacher.insertMany([
                { name: 'Usthad Ali', subject: 'Hifz', salaryAmount: 15000, phone: '9876543210' },
                { name: 'Usthad Umer', subject: 'Fiqh', salaryAmount: 12000, phone: '1234567890' }
            ]);

            // Students
            await Student.insertMany([
                { name: 'Abdullah', admissionNo: 'AD001', classOrBatch: 'Hifz A', contact: '555-0101' },
                { name: 'Ibrahim', admissionNo: 'AD002', classOrBatch: 'Hifz B', contact: '555-0102' },
                { name: 'Yusuf', admissionNo: 'AD003', classOrBatch: 'Fiqh 1', contact: '555-0103', hifzComplete: true }
            ]);

            // Salaries
            await Salary.create({
                teacher: teachers[0]._id,
                month: '2024-01',
                amount: 15000,
                datePaid: new Date()
            });
            console.log('Data Seeded Successfully');
        }
    } catch (err) {
        console.error('Seeding Error:', err);
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.redirect('/dashboard');
});

app.use('/', require('./routes/dashboardRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/students', require('./routes/studentRoutes'));
app.use('/teachers', require('./routes/teacherRoutes'));
app.use('/salary', require('./routes/salaryRoutes'));

// 404 Handler
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
