import express from "express";
import { getMyUser, getUserInfo, updateUser } from "controllers/users.controller";
import authMiddleware from "middleware/authMiddleware";


const router = express.Router();

router.route('/me')
    .get(authMiddleware, getMyUser)
    ;


router.route('/:id')
    .put(authMiddleware, updateUser)
    // .delete(deleteUser)
    .get(authMiddleware, getUserInfo);

export default router;