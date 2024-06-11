import asyncMiddleware from "./asyncMiddleware";
import { generate, verify } from "../utils/jwtManager";
import { user, User, NewUser } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { VerifiedUser } from '../types/types';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware = asyncMiddleware(async (req, res, next) => {
    const { authorization } = req.headers;
    // console.log('authorization:', authorization)//TESTING
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split(' ')[1];
        // console.log("token:", token);//TESTING
        try {
            const decoded = verify(token);
            // console.log('decoded:', decoded); //TESTING
            const verifyUser:VerifiedUser[] = await db
            .select({
                id: user.id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profile_image_URL: user.profile_image_URL,
                created_at: user.created_at,
            })
            .from(user)
            .where(eq(user.id, decoded.id));
            if (verifyUser.length > 0) {
                req.user = verifyUser[0];
                next();
            } else {
                res.status(401);
                res.redirect('/login');
                throw new Error('Not authorized, invalid token');
            }
        } catch (error) {
            if(error instanceof jwt.TokenExpiredError){
                res.status(401);
                res.redirect('/login');
                throw new Error('Token expired!!');
            }
            console.error('Error verifying token:', error); // TESTING
            res.status(401);
            res.redirect('/login');
            throw new Error('Not authorized, invalid token' );
        }
    } else {
        res.status(401);
        res.redirect('/login');
        throw new Error("Not authorized, no token");
    }
});

export default authMiddleware;
