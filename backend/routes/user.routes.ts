import express from "express";
import { getMyUser, getProfilePhoto, getUserInfo, updateUser } from "controllers/users.controller";
import authMiddleware from "middleware/authMiddleware";
import { pictureResults, upload } from "bucket/s3";
import asyncMiddleware from "middleware/asyncMiddleware";


const router = express.Router();

router.route('/me')
    .get(authMiddleware, getMyUser)
    ;

// router.post('/image', authMiddleware, upload.single('profile_picture'), pictureResults);
router.post('/image/:id', upload.single('profile_picture'), pictureResults);
router.get('/image/:id', getProfilePhoto);

router.route('/:id')
    .put(authMiddleware, updateUser)
    // .delete(deleteUser)
    .get(authMiddleware, getUserInfo);

export default router;