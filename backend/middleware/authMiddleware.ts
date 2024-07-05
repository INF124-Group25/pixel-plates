import asyncMiddleware from "./asyncMiddleware";
import { generate, verify } from "../utils/jwtManager";
import { user, User, NewUser } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { VerifiedUser } from "../types/types";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = asyncMiddleware(async (req, res, next) => {
    try {
        const { jwt } = req.cookies;
        // console.log('jwt:', jwt); //TESTING
        if (!jwt) {
            throw new Error("Not authorized, no token");
        }
        const decoded = verify(jwt);
        // console.log('decoded:', decoded); //TESTING
        const verifyUser: VerifiedUser[] = await db
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
        // console.log('verifyUser:', verifyUser); //TESTING
        if (verifyUser.length > 0) {
            req.user = verifyUser[0];
            // console.log('req.user:', req.user); //TESTING
            next();
        } else {
            throw new Error("Not authorized, invalid user");
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401);
            res.redirect("/login");
            throw new Error("Token expired!!");
        }
        res.status(401);
        res.redirect("/login");
        throw new Error("Not authorized, invalid token");
    }
});

export const checkAuthStatus = asyncMiddleware(async (req, res, next) => {
    try{
        const { jwt } = req.cookies;
        if (!jwt) {
            res.status(200).send({ isAuthenticated: false });
            return;
        }
        const decoded = verify(jwt);
        const verifyUser: Partial<VerifiedUser>[] = await db
            .select({id: user.id })
            .from(user)
            .where(eq(user.id, decoded.id));
        if (verifyUser.length > 0) {
            res.status(200).send({ isAuthenticated: true });
        } else {
            res.status(200).send({ isAuthenticated: false });
        }
    }catch(error){
        res.status(200).send({ isAuthenticated: false});
    }
});


export default authMiddleware;
