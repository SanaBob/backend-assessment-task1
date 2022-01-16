import express, { Request, Response } from 'express';
import { User } from '../models/User';
import AsyncWrapper from '../utils/async-wrapper';

const router = express.Router();

//login /user/login/?username=xxx&password=xxx
router.get('/login', AsyncWrapper(async (req: Request, res: Response) => {
    try {

        if (!req.body.username || !req.body.password) throw new Error("error")

        const user = await User.findOne({username: req.body.username.toLowerCase()})
        
        if(!user || user.password !== req.body.password){
            throw new Error("error")
        }

        res.status(200).json(user)

    } catch (e) {
        res.status(400).json({ message: 'User validation failed: username or password is wrong.' });
    }
}));

//registration /register/login/?username=xxx&password=xxx
router.post('/register', AsyncWrapper(async (req: Request, res: Response) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e);
    }
}));

export default router;
