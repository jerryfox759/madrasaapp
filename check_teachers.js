const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/madrasa_db');
        console.log('MongoDB Connected');

        const Teacher = require('./models/Teacher');
        const count = await Teacher.countDocuments();
        console.log(`Teacher Count: ${count}`);

        if (count > 0) {
            const teachers = await Teacher.find();
            console.log(teachers);
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
