import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google"
import express from "express";

const router = express.Router();

router.use("/*", ExpressAuth({ providers: [Google] }));

export default router;