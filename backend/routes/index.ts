// routes/index.ts

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import testRoutes from "./test.routes";
import postRoutes from "./post.routes";

const routes = {
    authRoutes,
    userRoutes,
    testRoutes,
    postRoutes,
};

export {authRoutes, userRoutes, testRoutes, postRoutes};
export default routes;