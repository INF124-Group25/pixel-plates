import { db } from "db/db";
import { user, NewUser, User } from "db/schema";
import { eq } from "drizzle-orm";
import asyncMiddleware from "middleware/asyncMiddleware";
import { hashPassword, comparePassword } from "utils/passwordManager";
import { generate } from "utils/jwtManager";
import { AuthRequest } from "types/types";

const registerUser = asyncMiddleware(async (req, res, next) => {
    const { username, password, email, bio, profile_image_URL } = req.body;
    if (!username || !password || !email || !bio || !profile_image_URL) {
        throw new Error("All fields are required");
    }
    // console.log(req.body);//TESTING
    //validate user
    const user_exists = await db
        .select()
        .from(user)
        .where(eq(user.email, email));
        console.log(user_exists.length);//TESTING
    if (user_exists.length > 0) throw new Error("User already exists");
    //encrypt password
    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword); // TESTING
    const newUser: NewUser = {
        username: username,
        password: hashedPassword,
        email: email,
        bio: bio,
        profile_image_URL: profile_image_URL,
    };
    const registeredUser = await db.insert(user).values(newUser).returning();
    res.status(201).send({
        // or use json function | TEST IT OUT
        id: registeredUser[0].id,
        username: registeredUser[0].username,
        email: registeredUser[0].email,
        bio: registeredUser[0].bio,
        profile_image_URL: registeredUser[0].profile_image_URL,
        created_at: registeredUser[0].created_at,
        token: generate(registeredUser[0].id),
    });
});

const loginUser = asyncMiddleware(async (req, res, next) => {
    const { username, password } = req.body; // might change username to email ORRRR do username || email
    // validate user
    const existing_user = await db
        .select()
        .from(user)
        .where(eq(user.username, username));
    if (!existing_user) throw new Error("Invalid username");
    if (await comparePassword(password, existing_user[0].password)) {
        res.status(200).send({
            id: existing_user[0].id,
            username: existing_user[0].username,
            email: existing_user[0].email,
            bio: existing_user[0].bio,
            profile_image_URL: existing_user[0].profile_image_URL,
            created_at: existing_user[0].created_at,
            token: generate(existing_user[0].id),
        });
    } else {
        // invalid password
        return res.status(401).send({ error: "Authentication failed" });
    }
});

const getUserInfo = asyncMiddleware<AuthRequest>(async (req, res, next) => {
    const userReq = req.user;
    const id = req.params.id;
    if (userReq.id.toString() !== id) {
        res.status(401);
        throw new Error("Not authorized, invalid user");
    }
    const userInfo = await db
        .select({
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image_URL: user.profile_image_URL,
            created_at: user.created_at,
        })
        .from(user)
        .where(eq(user.id, id));
    res.status(200).send(userInfo);
});

export { registerUser, loginUser, getUserInfo };
