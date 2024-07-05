import { db } from "../db/db";
import { user, NewUser, User } from "../db/schema";
import { eq } from "drizzle-orm";
import asyncMiddleware from "../middleware/asyncMiddleware";
import { hashPassword, comparePassword } from "../utils/passwordManager";
import { generate } from "../utils/jwtManager";
import {
    LoginRequestBody,
    RegisterRequestBody,
    UpdateUserRequestBody,
    UserDataResponse,
} from "~shared/types.js";
import {
    getUserWithId,
    updateUserWithUser,
} from "../services/user.service.js";
import { getPhoto } from "../bucket/s3.js";
import { Request, Response, NextFunction } from "express";

const registerUser = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    const { username, password, email } = req.body as RegisterRequestBody;
    if (!username || !password || !email) {
        throw new Error("All fields are required");
    }
    // console.log(req.body);//TESTING
    //validate user
    const user_exists = await db
        .select()
        .from(user)
        .where(eq(user.email, email));
    // console.log(user_exists.length); //TESTING
    if (user_exists.length > 0) throw new Error("User already exists");
    //encrypt password
    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword); // TESTING
    const newUser: NewUser = {
        username: username,
        password: hashedPassword,
        email: email,
    };
    const registeredUser = await db.insert(user).values(newUser).returning();
    const responseBody: UserDataResponse = {
        id: registeredUser[0].id,
        username: registeredUser[0].username,
        email: registeredUser[0].email,
        bio: registeredUser[0].bio,
        profile_image_URL: registeredUser[0].profile_image_URL,
        created_at: registeredUser[0].created_at,
    };
    res
        .status(201)
        .cookie("jwt", generate(registeredUser[0].id, '1hr'), {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' ? true : false,
            maxAge: 60 * 60 * 1000,
        })
        .send(responseBody);
});

const loginUser = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    const { username, password } = req.body as LoginRequestBody; // might change username to email ORRRR do username || email
    // validate user
    const existing_user = await db
        .select()
        .from(user)
        .where(eq(user.username, username));
    if (!existing_user) throw new Error("Invalid username");
    if (await comparePassword(password, existing_user[0].password)) {
        const responseBody: UserDataResponse = {
            id: existing_user[0].id,
            username: existing_user[0].username,
            email: existing_user[0].email,
            bio: existing_user[0].bio,
            profile_image_URL: existing_user[0].profile_image_URL,
            created_at: existing_user[0].created_at,
        };
        res
            .status(200)
            .cookie("jwt", generate(existing_user[0].id, '1hr'), {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production' ? true : false,
                maxAge: 60 * 60 * 1000,
            })
            .send(responseBody);
    } else {
        res.status(401);
        throw new Error("Authentication failed");
    }
});

const logoutUser = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    res.status(200).json({ message: "logged out" });
});

const getUserInfo = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    const userReq = req.user;
    if (!userReq) {
        res.status(401);
        throw new Error("No request.user field");
    }
    const id = req.params.id;
    if (userReq.id.toString() !== id) {
        res.status(401);
        throw new Error("Not authorized, invalid user");
    }
    const userInfo:UserDataResponse = (await db
        .select({
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image_URL: user.profile_image_URL,
            created_at: user.created_at,
        })
        .from(user)
        .where(eq(user.id, id)))[0];
    res.status(200).send(userInfo);
});

const getMyUser = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    res.status(200).send(req.user);
});


const updateUser = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    const userReq = req.user;
    if (!userReq || !req.user) {
        res.status(401);
        throw new Error("No request.user field");
    }
    const userRecord = await getUserWithId(req.user.id);
    const updateUser = req.body as UpdateUserRequestBody;
    const passwordInEditRequest = updateUser.password.length > 0;
    let userPut: NewUser;
    userPut = {
        username: updateUser.username || userRecord.username,
        password: "",
        email: updateUser.username || userRecord.email,
        bio: updateUser.bio || userRecord.bio,
        profile_image_URL:
            updateUser.profile_image_URL || userRecord.profile_image_URL,
    };
    if (passwordInEditRequest) {
        updateUser.password = await hashPassword(updateUser.password);
        userPut.password = updateUser.password;
    }
    const changedUser = await updateUserWithUser(
        userPut,
        passwordInEditRequest,
        userRecord.id
    );
    res.status(200).send(changedUser);
});

const getProfilePhoto = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    const { Body, ContentType, Key } = await getPhoto(req.params.id);
    res.setHeader("Content-Disposition", `attachment; filename="${Key}"`);
    res.setHeader("Content-Type", ContentType);
    res.send(Body);
});

const getUsers = asyncMiddleware(async (req:Request, res:Response, next:NextFunction) => {
    const users = await db
        .select({
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image_URL: user.profile_image_URL,
            created_at: user.created_at,
        })
        .from(user);
    res.status(200).send(users);
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserInfo,
    getMyUser,
    updateUser,
    getProfilePhoto,
    getUsers,
};
