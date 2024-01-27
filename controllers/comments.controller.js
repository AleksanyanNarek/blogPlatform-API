import dotenv from 'dotenv';
dotenv.config();

import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import PostModel from '../models/post.model.js';
import CommentModel from '../models/comment.model.js';

export const writeComment = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { postId, user, message } = req.body;

            if (!postId || !message) {
                return next(new ErrorHandler("Missing required fields", 400));
            }

            const post = await PostModel.findById(postId);
            if (!post) {
                return next(new ErrorHandler("Incorrect post id", 400));
            }

            const comment = await CommentModel.create({ post: postId, userName: user.userName, message });
            
            res.status(201).json({
                success: true,
                comment
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const getPostAllComments = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { postId } = req.params;

            if (!postId) {
                return next(new ErrorHandler("Missing required fields", 400));
            }

            const post = await PostModel.findById(postId);
            if (!post) {
                return next(new ErrorHandler("Incorrect post id", 400));
            }

            const comments = await CommentModel.find({ post: postId }) || [];
            
            res.status(200).json({
                success: true,
                comments
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const deleteComment = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { user } = req.body;
            const { id } = req.params;

            if (!id) {
                return next(new ErrorHandler("Missing required fields", 400));
            }

            const filter = { _id: id, userName: user.userName };

            const deletedComment = await CommentModel.findOneAndDelete(filter);
            
            if (!deletedComment) {
                return next(new ErrorHandler("You don't have comment like this", 400));
            }
            
            res.status(200).json({
                success: true,
                deletedComment
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)