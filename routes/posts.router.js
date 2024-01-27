import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controllers/posts.controller.js";

const postsRouter = express.Router();

postsRouter.post('/', isAuthenticated, createPost);
postsRouter.get('/', getAllPosts);
postsRouter.get('/:id', getOnePost);
postsRouter.put('/', isAuthenticated, updatePost);
postsRouter.delete('/:id', isAuthenticated, deletePost);

export default postsRouter;