import express from "express";
import { db } from "db/db";
import { user, post, User, userFollowing, business } from "db/schema";
import { eq, lt, gte, ne } from 'drizzle-orm';
import authMiddleware from "middleware/authMiddleware";
import asyncMiddleware from "middleware/asyncMiddleware";
import { like } from "drizzle-orm";

const router = express.Router();

const loggedInUser = "TheLink";

// test/user
router.get("/user", async (req, res) => {
    try {
        const result = await db.select({ username: user.username, bio: user.bio }).from(user);
        res.send(result);
        // console.log(result);
    } catch (error) {
        // res.send(error).sendStatus(500);
        res.send(error);

    }
});

//  get other user profile details
router.get("/user/:userId", async (req, res) => {
    try {
        const userIdParam = req.params.userId;
        const result = await db.select({ username: user.username, bio: user.bio }).from(user).where(eq(user.id, userIdParam));
        res.send(result);
        // console.log(result);
    } catch (error) {
        // res.send(error).sendStatus(500);
        res.send(error);

    }
});

const gettingAllUsersService = async() => {
    const results = await db.select().from(user);
    return results;
};

const testingGettingAllUsers = asyncMiddleware(async(req,res,next)=>{
    const users = gettingAllUsersService;
    res.send(users);
    console.log(users);
});

router.get('/test', authMiddleware, testingGettingAllUsers);





// grabs the list of posts for the user
router.get("/user/:username/post", async (req, res) => {
    try {
        const username = req.params.username;
        const userId = await db.select({ id: user.id }).from(user).where(eq(user.username, username));
        const posts = await db.select().from(post).where(eq(post.user_id, userId[0].id));

        res.send([posts]);
        // console.log(posts);
    } catch (error) {
        // res.send(error).sendStatus(500);
        res.send(error);
    }
});

// grabs the posts of followed members
router.get("/feed", authMiddleware, asyncMiddleware(async (req, res) => {
    try {
        let followingList: string[] = [];
        let feed: any[] = [];

        // get current hardcoded user
        const userId = await db.select({ id: user.id }).from(user).where(eq(user.username, loggedInUser));
        // console.log("user id is:", userId);

        // search for who they are following
        const following = await db.select({ follow_id: userFollowing.following_id}).from(userFollowing).where(eq(userFollowing.user_id, userId[0].id));
        
        following.forEach(followingUser => {
            // console.log("followingUser: ", followingUser.follow_id)
            followingList.push(followingUser.follow_id);
        });

        // console.log("followingList:", followingList);

        
        // go to the posts of each user and get what to display: this is wrong!
        // followingList.forEach(async followingUser => {
        //     const followingUserPosts = await db.select().from(post).where(eq(post.user_id, followingUser));
        //     console.log("posts: ", followingUserPosts)
        //     feed.push(followingUserPosts)
        //     console.log("pushed to feed: ", feed)
        // })

        let feedPromises = followingList.map(async followingUser => {
            const followingUserPosts = await db.select().from(post).where(eq(post.user_id, followingUser));
            // console.log("posts: ", followingUserPosts);
            return followingUserPosts;
        });


        feed = await Promise.all(feedPromises)

        // flatten the array of posts
        feed = feed.flat();

        // Sort the posts by the created_at field
        feed.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        res.send(feed);
        // console.log(feed);
    

    } catch (error) {
        // res.send(error).sendStatus(500);
        // res.send(error);
        res.status(404)
        throw new Error("feed not working:");
    }
}));

// show followed members

// get business details
router.get("/:business_id", async (req, res) => {
    try {
        const businessId = req.params.business_id;
        const businessDetails = await db.select().from(business).where(eq(business.id, businessId));
        res.send(businessDetails);
    } catch (error) {
        res.send(error);
    }
});

router.get("/search/:query", async (req, res) => {
    try {
        const query = req.params.query;
        const results = await db
            .select()
            .from(business)
            .where(like(business.business_name, `%${query}%`));
        res.send(results);
    } catch (error) {
        res.send(error);
    }
});

export default router;