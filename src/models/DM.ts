import mongoose from 'mongoose';

export const DMSchema = new mongoose.Schema({
    usersId: {
        type: [String],
        required: true
    },
    messages: {
        type: [Object],
    }
});

const DM = mongoose.model('DM', DMSchema);
export { DM };