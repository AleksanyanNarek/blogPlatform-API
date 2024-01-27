import dotenv from 'dotenv';
dotenv.config();

import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import PostModel from '../models/post.model.js';
import CommentModel from '../models/comment.model.js';

export const createPost = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { user, title, body } = req.body;

            const post = await PostModel.create({ user: user._id, title, body });
            
            res.status(201).json({
                success: true,
                post
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const getAllPosts = CatchAsyncError(
    async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const startIndex = (page - 1) * limit;
            
            const posts = await PostModel.find().limit(limit).skip(startIndex);
            
            res.status(200).json({
                success: true,
                posts
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const getOnePost = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                return next(new ErrorHandler("Missing required fields", 400));
            }

            const post = await PostModel.findById(id);

            if (!post) {
                return next(new ErrorHandler("Post not found", 404));
            }
            
            res.status(200).json({
                success: true,
                post
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const updatePost = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { user, postId, title, body } = req.body;

            if (!postId) {
                return next(new ErrorHandler("Missing required fields", 400));
            }

            const filter = { _id: postId, user: user._id };

            const updatedPost = await PostModel.findOneAndUpdate(filter, { title, body }, { new: true });

            if (!updatedPost) {
                return next(new ErrorHandler("You don't have post like this", 404));
            }
            
            res.status(200).json({
                success: true,
                post: updatedPost
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const deletePost = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { user } = req.body;
            const { id } = req.params;

            if (!id) {
                return next(new ErrorHandler("Missing required fields", 400));
            }

            const filter = { _id: id, user: user._id };

            const deletedPost = await PostModel.findOneAndDelete(filter);
            
            if (!deletedPost) {
                return next(new ErrorHandler("You don't have post like this", 404));
            }

            await CommentModel.deleteMany({ post: id });
            
            res.status(200).json({
                success: true,
                post: deletedPost
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)