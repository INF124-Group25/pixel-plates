import express from "express";
import { db } from "db/db";
import { user, post, User, userFollowing, business } from "db/schema";
import { eq, lt, gte, ne } from 'drizzle-orm';
import authMiddleware from "middleware/authMiddleware";
import asyncMiddleware from "middleware/asyncMiddleware";
import { like } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import { test, upload, pictureResults } from "bucket/s3";


const router = express.Router();

router.get('/s3', asyncMiddleware(async(req, res, next) => {
    const blob = await test();
    res.setHeader('Content-Type', 'image/jpeg');
    blob?.pipe(res);
}));

router.post('/image', authMiddleware, upload.single('profile_picture'), pictureResults);

// router.post('/image', authMiddleware, upload.single('profile_picture'), pictureResults);


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

        res.send([posts]); // remove this in the future
        // console.log(posts);
    } catch (error) {
        // res.send(error).sendStatus(500);
        res.send(error);
    }
});

// grabs the posts of followed members
// router.get("/feed", authMiddleware, asyncMiddleware(async (req, res) => {
router.get("/feed", async (req, res) => {
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
});

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

router.get("/business_post/:business_id", async (req, res) => {
    try {
        const businessId = req.params.business_id;
        const posts = await db.select().from(post).where(eq(post.business_id, businessId));
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
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

// make a call to yelp api
router.get("/yelp/:location?", async (req, res) => {
    const location = req.params.location || 'Los Angeles'; // Default to 'Los Angeles' if no location is provided
    const term = req.query.term || 'restaurants'; // Default to 'restaurants' if no term is provided
    const categories = req.query.categories || 'restaurants';
    const limit = req.query.limit || 10; // Default to 20 results if no limit is provided
    const sortBy = req.query.sort_by || 'best_match';

    const YELP_API_KEY = process.env.YELP_API_KEY;
    
    const url = `https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}&categories=${categories}&limit=${limit}&sort_by=${sortBy}`;

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching data from Yelp API:', error);
        res.status(500).send('Error fetching data from Yelp API');
    }
});

// route to create a post
router.post("/create-post", async (req, res) => {
    const { businessData, review, postUrl } = req.body; // extract name later
    // console.log("businessData: ", businessData.name)
    // console.log("review: ", review)

    if (!businessData) {
        return res.status(400).send({ message: "Invalid business request body" });
    }
    if (!review) {
        return res.status(400).send({ message: "Invalid review request body" });
    }

    try {
        // check if the business already exists in the database -- important for explore search
        let existingBusiness = await db.select().from(business).where(eq(business.business_name, businessData.name)).limit(1).execute();

        let businessId;

        // if the business does not exist, insert it
        if (existingBusiness.length === 0) {
            businessId = uuidv4();
            await db.insert(business).values({
                id: businessId,
                business_name: businessData.name,
                address: businessData.location.address1,
                phone_number: businessData.phone,
                star_rating: businessData.rating,
                review_count: businessData.review_count,
            }).execute();
        } else {
            businessId = existingBusiness[0].id;
        }

        // insert the post into the database
        const postId = uuidv4();

        await db.insert(post).values({
            id: postId,
            user_id: "c837cf80-4e95-4d09-bcd1-2805dafcef7a", // MAKE SURE TO REPLACE WITH CURRENT USER
            caption: " ",
            review: review,
            business_id: businessId,
            post_url: postUrl
        }).execute();

        res.status(201).send({ message: "Post created successfully" });

    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error creating post');
    }
});

router.put('/post/:postId', async (req, res) => {
    const postId = req.params.postId;
    const newUrl = req.body.post_url;

    if (!newUrl) {
        return res.status(400).send({ message: 'New URL is required' });
    }

    try {
        await db.update(post)
            .set({ post_url: newUrl })
            .where(eq(post.id, postId))
            .execute();

        res.status(200).send({ message: 'Post URL updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating post URL' });
    }
});


export default router;
