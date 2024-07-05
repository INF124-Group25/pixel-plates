import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/users.controller";
import { checkAuthStatus } from "../middleware/authMiddleware";


const router = express.Router();

// router.post('/', getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', checkAuthStatus);

export default router;