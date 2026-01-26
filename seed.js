const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Salary = require('./models/Salary');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
    try {
        await User.deleteMany();
        await Student.deleteMany();
        await Teacher.deleteMany();
        await Salary.deleteMany();

        console.log('Old Data Destroyed');

        // Admin
        const adminUser = await User.create({
            username: 'admin',
            password: 'password123'
        });

        console.log('Admin User Created: admin / password123');

        // Teachers
        const teachers = await Teacher.insertMany([
            { name: 'Usthad Ali', subject: 'Hifz', salaryAmount: 15000, phone: '9876543210' },
            { name: 'Usthad Umer', subject: 'Fiqh', salaryAmount: 12000, phone: '1234567890' }
        ]);

        console.log('Teachers Imported');

        // Students
        await Student.insertMany([
            { name: 'Abdullah', admissionNo: 'AD001', classOrBatch: 'Hifz A', contact: '555-0101' },
            { name: 'Ibrahim', admissionNo: 'AD002', classOrBatch: 'Hifz B', contact: '555-0102' },
            { name: 'Yusuf', admissionNo: 'AD003', classOrBatch: 'Fiqh 1', contact: '555-0103', hifzComplete: true }
        ]);

        console.log('Students Imported');

        // Salaries
        await Salary.create({
            teacher: teachers[0]._id,
            month: '2024-01',
            amount: 15000,
            datePaid: new Date()
        });

        console.log('Salary Data Imported');

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const runSeed = async () => {
    await connectDB();
    await importData();
};

runSeed();
