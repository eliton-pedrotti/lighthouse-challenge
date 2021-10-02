import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '../config/auth';

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
       verify(token, authConfig.secret);
        
        return next();
    } catch {
        throw new Error('Invalid JWT!')
    }
}
