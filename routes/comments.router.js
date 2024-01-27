import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { deleteComment, getPostAllComments, writeComment } from "../controllers/comments.controller.js";

const commentsRouter = express.Router();

commentsRouter.post('/', isAuthenticated, writeComment);
commentsRouter.get('/:postId', getPostAllComments);
commentsRouter.delete('/:id', isAuthenticated, deleteComment);

export default commentsRouter;