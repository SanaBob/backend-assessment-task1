import mongoose from 'mongoose';

export const TweetSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    likesIds: {
        type: [String],
        default: []
    },
    retweets: {
        type: Number,
        default: 0
    },
    retweetsIds: {
        type: [String],
        default: []
    },
});

const Tweet = mongoose.model('Tweet', TweetSchema);
export { Tweet };