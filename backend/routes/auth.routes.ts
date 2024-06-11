import express from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/users.controller";
import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();

// router.post('/', getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.route('/:id')
    // .put(updateUser)
    // .delete(deleteUser)
    .get(authMiddleware as express.RequestHandler, getUserInfo as express.RequestHandler);

// router.use("/*", ExpressAuth({ providers: [Google] }));

export default router;