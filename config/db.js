const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Local MongoDB failed, starting In-Memory Database...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            const conn = await mongoose.connect(uri);
            console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
        } catch (memError) {
            console.error(`Error: ${memError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
