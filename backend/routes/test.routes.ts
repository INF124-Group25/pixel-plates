import express from "express";
import { db } from "db/db";
import { user, post, User } from "db/schema";
import { eq, lt, gte, ne } from 'drizzle-orm';


const router = express.Router();

// test/user
router.get("/user", async (req, res) => {
    try {
        const result = await db.select({ username: user.username, bio: user.bio }).from(user);
        res.send(result);
        console.log(result);
    } catch (error) {
        // res.send(error).sendStatus(500);
        res.send(error);

    }
});

// grabs the list of posts for the user
router.get("/user/:username/post", async (req, res) => {
    try {
        const username = req.params.username;
        const userId = await db.select({ id: user.id }).from(user).where(eq(user.username, username));
        const posts = await db.select().from(post).where(eq(post.user_id, userId[0].id));

        res.send([posts]);
        console.log(posts);
    } catch (error) {
        // res.send(error).sendStatus(500);
        res.send(error);
    }
});

export default router;