import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    DMUsers: {
        type: [String],
        default: []
    }
});

const User = mongoose.model('User', UserSchema);
export { User };