import express from "express";
import { db } from "../db/db";
import { eq } from 'drizzle-orm';
import { user, post, userFollowing, business } from "../db/schema";

import { pictureResults, upload } from "../bucket/s3";
import { getPhotoPost, getAllPosts } from "../controllers/post.controller";


const router = express.Router();


router.post('/image/:id', upload.single('post_picture'), pictureResults);
router.get('/image/:id', getPhotoPost);


router.get('/', getAllPosts);

// get posts
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;

    try { 
        const posts = await db.select().from(post).where(eq(post.id, postId));
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
})


export default router;