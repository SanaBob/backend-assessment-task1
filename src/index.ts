import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import dotenv from 'dotenv';
import UserController from './controllers/UserController';
import DMController from './controllers/DMController';
import TweetController from './controllers/TweetController';
import { connect } from './utils/connect';

dotenv.config(); //for enviroment variables

const app = express();
app.use(express.json());

// const corsOptions = {    //for cors
//     origin: ['http://localhost:3000', process.env.FRONT_END_URL],
//     optionsSuccessStatus: 200,
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
//         'Access-Control-Allow-Credentials': true
//     }
// };

// app.use(cors()); //for cors

app.use('/user', UserController);
app.use('/dm', DMController);
app.use('/tweet', TweetController);

const server = app.listen(process.env.PORT || 3001, async () => {    // Using 3001 as standart without enviroment variables
    await connect();
    console.log('server started on port 3001');
});

export default server;
