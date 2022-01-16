import { RequestHandler } from "express";

const AsyncWrapper = function AsyncWrapper(fn: Function){
    return (req: any, res: any, next: any) => {
        return fn(req, res).catch(next);
    }
}

export default AsyncWrapper;
