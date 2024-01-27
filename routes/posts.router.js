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

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: CRUD Posts
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
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
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created a new post
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               post:
 *                 user: '65b505ffab054a1e83add10f'
 *                 title: example title
 *                 body: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, assumenda quia. Sit beatae hic molestias amet enim aut reiciendis aliquam.
 *                 _id: '65b5066cab054a1e83add115'
 *                 __v: 0
 *       '401':
 *         description: Please login to access this resource || access token is not valid
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination (default 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of posts per page (default 10)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: Successfully retrieved all posts
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               posts:
 *                 - _id: '65b4fc9548e7c8f53e6cdc30'
 *                   user: '65b3fb2bc57e7f387abf2ffb'
 *                   title: example title 1
 *                   body: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, assumenda quia. Sit beatae hic molestias amet enim aut reiciendis aliquam.
 *                   __v: 0
 *                 - _id: '65b5066cab054a1e83add115'
 *                   user: '65b505ffab054a1e83add10f'
 *                   title: example title 2
 *                   body: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, assumenda quia. Sit beatae hic molestias amet enim aut reiciendis aliquam.
 *                   __v: 0
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *           example: '65b4fc9548e7c8f53e6cdc30'
 *     responses:
 *       '200':
 *         description: Successfully retrieved the post
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               post:
 *                 _id: '65b4fc9548e7c8f53e6cdc30'
 *                 user: '65b3fb2bc57e7f387abf2ffb'
 *                 title: example title
 *                 body: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, assumenda quia. Sit beatae hic molestias amet enim aut reiciendis aliquam.
 *                 __v: 0
 *       '400':
 *         description: Missing required fields
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /posts:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
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
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated the post
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               post:
 *                 _id: '65b4fc9548e7c8f53e6cdc30'
 *                 user: '65b3fb2bc57e7f387abf2ffb'
 *                 title: new example title
 *                 body: new Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, assumenda quia. Sit beatae hic molestias amet enim aut reiciendis aliquam.
 *                 __v: 0
 *       '400':
 *         description: Missing required fields
 *       '401':
 *         description: Please login to access this resource || access token is not valid
 *       '404':
 *         description: You don't have post like this
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *           example: '65b505a2528ddddcf4522daa'
 *       - in: cookie
 *         name: accessToken
 *         required: true
 *         description: to check if you are authenticated
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwNjM3MTIwNn0.XerT5MoJKXE-_w0afHPEukkveEzHJk2FtXQQp7R9rQk; Path=/; HttpOnly
 *     responses:
 *       '200':
 *         description: Successfully deleted the post
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               post:
 *                 _id: '65b505a2528ddddcf4522daa'
 *                 user: '65b3fb2bc57e7f387abf2ffb'
 *                 title: example title
 *                 body: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, assumenda quia. Sit beatae hic molestias amet enim aut reiciendis aliquam.
 *                 __v: 0
 *       '400':
 *         description: Missing required fields
 *       '401':
 *         description: Please login to access this resource || access token is not valid
 *       '404':
 *         description: You don't have post like this
 *       '500':
 *         description: Internal server error
 */