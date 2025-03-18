const mongoose = require('mongoose');

const connectDB = async () => {
    let retries = 3;
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB Connected');
            break;
        } catch (error) {
            console.error(`MongoDB Connection Error (Retries left: ${retries - 1}):`, error);
            retries -= 1;
            if (!retries) {
                console.error('MongoDB connection failed after multiple attempts. Exiting...');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, 5000)); // Wait before retrying
        }
    }
};

module.exports = connectDB;