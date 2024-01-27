import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upadateInfo, upadatePassword } from "../controllers/user.controller.js";

const usersRouter = express.Router();

usersRouter.patch('/update-info', isAuthenticated, upadateInfo);
usersRouter.patch('/update-password', isAuthenticated, upadatePassword);

export default usersRouter;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: manage your account
 */

/**
 * @swagger
 * /users/update-info:
 *   patch:
 *     summary: Update user email and/or userName
 *     tags: [Users]
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
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated user information
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 _id: '65b3fb2bc57e7f387abf2ffb'
 *                 userName: new example userName
 *                 email: newExampleMail@gmail.com
 *                 createdAt: '2024-01-26T18:34:19.156Z'
 *                 updatedAt: '2024-01-27T17:23:07.436Z'
 *                 __v: 0
 *       '401':
 *         description: Please login to access this resource or access token is not valid.
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/update-password:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
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
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated user information
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 _id: '65b3fb2bc57e7f387abf2ffb'
 *                 userName: example userName
 *                 email: exampleMail@gmail.com
 *                 createdAt: '2024-01-26T18:34:19.156Z'
 *                 updatedAt: '2024-01-27T17:23:07.436Z'
 *                 __v: 0
 *       '401':
 *         description: Please login to access this resource || access token is not valid.
 *       '400':
 *         description: Incorrect email || Incorrect password
 *       '500':
 *         description: Internal server error
 */