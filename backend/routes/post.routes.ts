import express from "express";
import authMiddleware from "middleware/authMiddleware";
import { pictureResults, upload } from "bucket/s3";
import { getPhotoPost } from "controllers/post.controller";


const router = express.Router();


router.post('/image/:id', upload.single('post_picture'), pictureResults);
router.get('/image/:id', getPhotoPost);


export default router;