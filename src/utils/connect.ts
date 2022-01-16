import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);
        console.log('connected to mongoDB');
    } catch (e) {
        console.log(e);
    }
}

const close = async () => {
    await mongoose.connection.close();
    console.log('connection closed');
}

export { connect, close };