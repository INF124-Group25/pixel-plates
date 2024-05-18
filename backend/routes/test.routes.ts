import express from "express";
import { db } from "db/db";
import { user, User } from "db/schema";

const router = express.Router();

// test/user
router.get("/user", async (req, res) => {
    try {
        const result = await db.select({ name: user.username }).from(user);
        res.send(result);
        console.log(result);
    } catch (error) {
        res.send(error).sendStatus(500);
    }
});

export default router;