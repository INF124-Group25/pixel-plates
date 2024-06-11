// routes/index.ts

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import testRoutes from "./test.routes";
import postRoutes from "./post.routes";
import nextJSHandler from "./nextjsHandler";

const routes = {
    authRoutes,
    userRoutes,
    testRoutes,
    postRoutes,
    nextJSHandler
};

export {authRoutes, userRoutes, testRoutes, postRoutes, nextJSHandler};
export default routes;