import express from "express";

import authRouter from "./auth.router.js";
import postsRouter from "./posts.router.js";
import commentsRouter from "./comments.router.js";
import usersRouter from "./user.router.js";

const router = express.Router();

router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/users', usersRouter);

export default router;