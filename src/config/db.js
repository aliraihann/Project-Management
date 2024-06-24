import { configDotenv } from 'dotenv';
configDotenv()
import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const uri = process.env.uri;
        await mongoose.connect(uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        throw error;
    }
};

export default dbConnect;
