import express, { Request, Response } from 'express';
import { DM } from '../models/DM';
import { User } from '../models/User';
import AsyncWrapper from '../utils/async-wrapper';

const router = express.Router();

//POST /dm/create/?authorId=xxx&recipientId=xxx&body=xxx
router.post('/create', AsyncWrapper(async (req: Request, res: Response) => {
    try {

        if (!req.body.authorId || !req.body.recipientId || !req.body.body) throw new Error("error")

        const dm = new DM({
            usersId: [req.body.authorId, req.body.recipientId],
            body: [{body: req.body.body, authorId: req.body.authorId}],
        });

        await dm.save();

        await User.findByIdAndUpdate(req.body.authorId, { $push: { dms: { recipientId: req.body.recipientId, dmId: dm._id } } });
        await User.findByIdAndUpdate(req.body.recipientId, { $push: { dms: { recipientId: req.body.authorId, dmId: dm._id } } });

        res.status(201).json(dm._id)

    } catch (e) {
        res.status(400).json({ message: 'User validation failed: username or password is wrong.' });
    }
}));

// PUT /dm/update/?authorId=xxx&body=xxx
router.put('/update', AsyncWrapper(async (req: Request, res: Response) => {
    try {
        DM.findById(req.body.id, (err: any, docs: any) => {
            docs.messages = [...docs.messages, { body: req.body.body, authorId: req.body.authorId }]
            docs.save()
            res.status(201).json('DM updated');
        })
    } catch (e) {
        res.status(400).json(e);
    }
}));

export default router;
