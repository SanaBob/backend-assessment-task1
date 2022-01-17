import express, { Request, Response } from 'express';
import { Tweet } from '../models/Tweet';
import AsyncWrapper from '../utils/async-wrapper';

const router = express.Router();

// GET tweet/get/?authorId=xxx
router.get('/get', AsyncWrapper(async (req: Request, res: Response) => {
    try {

        if (!req.body.authorId) throw new Error("error")

        const tweets = await Tweet.find({ id: req.body.authorId })

        if(!tweets) throw new Error("error")

        res.status(200).json(tweets)

    } catch (e) {
        res.status(400).json({ message: 'No tweets found or no id has been provided' });
    }
}));

//POST tweet/create/?authorId=xxx&username=xxx&body=xxx
router.post('/create', AsyncWrapper(async (req: Request, res: Response) => {
    try {

        if (!req.body.authorId || !req.body.body) throw new Error("error")

        const tweet = new Tweet({
            authorId: req.body.authorId,
            body: req.body.body,
        });

        await tweet.save();
        res.status(201).json(tweet)

    } catch (e) {
        res.status(400).json({ message: 'authorId/username/body not provided' });
    }
}));

// PUT /tweet/update/?id=xxx&body=xxx
router.put('/update', async (req: Request, res: Response) => {
    try {
        if (!req.body.id || !req.body.body) throw new Error("error")

        Tweet.findById(req.body.id, (err: any, tweet: any) => {
            tweet.body = req.body.body;
            tweet.save();
            res.status(201).json({tweet});
        })
    }
    catch (e) {
        res.status(400).json({message: "id/body not provided"});
    }
})

//delete /tweet/delete/?id=xxx
router.delete('/delete', AsyncWrapper(async (req: Request, res: Response) => {
    try {

        if (!req.body.id) throw new Error("error")

        await Tweet.findByIdAndDelete(req.body.id);
        
        res.status(200).json({message: "Tweet deleted"});

    } catch (e) {
        res.status(400).json({message: 'No id provided'});
    }
}));

// LIKE / RETWEET

//put /tweet/like/?id=xxx&authorId=xxx
router.put('/like', AsyncWrapper(async (req: Request, res: Response) => {
    try {

        if (!req.body.id) throw new Error("error")

        const result = await Tweet.findById(req.body.id)

        if(!result) throw new Error("error")

        if (result.likesIds.includes(req.body.authorId)) {
            result.likesIds.slice(result.likesIds.indexOf(req.body.authorId), 1);
            result.likes -= 1
            result.save()
            res.status(200).json({message: "Tweet unliked"});
        } else {
            result.likesIds.push(req.body.authorId)
            result.likes += 1
            result.save()
            res.status(200).json({message: "Tweet liked"});
        }


    } catch (e) {
        res.status(400).json({message: 'No id provided'});
    }
}));

//put /tweet/retweet/?id=xxx&authorId=xxx
router.put('/retweet', AsyncWrapper(async (req: Request, res: Response) => {
    try {

        if (!req.body.id) throw new Error("error")

        const result = await Tweet.findById(req.body.id)

        if(!result) throw new Error("error")

        if (result.retweetsIds.includes(req.body.authorId)) {
            result.retweetsIds.slice(result.retweetsIds.indexOf(req.body.authorId), 1);
            result.retweets -= 1
            result.save()
            res.status(200).json({message: "Tweet unretweeted"});
        } else {
            result.retweetsIds.push(req.body.authorId)
            result.retweets += 1
            result.save()
            res.status(200).json({message: "Tweet retweeted"});
        }

    } catch (e) {
        res.status(400).json({message: 'No id provided'});
    }   
}));



export default router;
