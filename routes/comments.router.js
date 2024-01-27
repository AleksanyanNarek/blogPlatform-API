import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { deleteComment, getPostAllComments, writeComment } from "../controllers/comments.controller.js";

const commentsRouter = express.Router();

commentsRouter.post('/', isAuthenticated, writeComment);
commentsRouter.get('/:postId', getPostAllComments);
commentsRouter.delete('/:id', isAuthenticated, deleteComment);

export default commentsRouter;

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: CRUD Posts
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Write a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         description: to check if you are authenticated
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwNjM3MTIwNn0.XerT5MoJKXE-_w0afHPEukkveEzHJk2FtXQQp7R9rQk; Path=/; HttpOnly
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created a new comment
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               comment:
 *                 post: '65b5066cab054a1e83add115'
 *                 userName: example userName
 *                 message: example message
 *                 _id: '65b5492dbff76fb8a8cc82c1'
 *                 __v: 0
 *       '400':
 *         description: Missing required fields
 *       '401':
 *         description: Please login to access this resource || access token is not valid
 *       '404':
 *         description: Comment not found || Post not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Get all comments of the post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to retrieve comments for
 *         schema:
 *           type: string
 *           example: '65b505a2528ddddcf4522daa'
 *     responses:
 *       '200':
 *         description: Successfully retrieved comments for the post
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               comments:
 *                 - _id: '65b5118dd59ac1d6fd1e1a71'
 *                   post: '65b505a2528ddddcf4522daa'
 *                   userName: example userName 1
 *                   message: example message 1
 *                   __v: 0
 *                 - _id: '65b51194d59ac1d6fd1e1a75'
 *                   post: '65b505a2528ddddcf4522daa'
 *                   userName: example userName 2
 *                   message: example message 2
 *                   __v: 0
 *       '400':
 *         description: Missing required fields
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *           example: '65b502475d8a32141e75fb8f'
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         description: to check if you are authenticated
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwNjM3MTIwNn0.XerT5MoJKXE-_w0afHPEukkveEzHJk2FtXQQp7R9rQk; Path=/; HttpOnly
 *     responses:
 *       '200':
 *         description: Successfully deleted the comment
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               comment:
 *                 _id: '65b502475d8a32141e75fb8f'
 *                 post: '65b4fc9548e7c8f53e6cdc30'
 *                 userName: example userName
 *                 message: example message
 *                 __v: 0
 *       '400':
 *         description: Missing required fields
 *       '401':
 *         description: Please login to access this resource || access token is not valid
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */