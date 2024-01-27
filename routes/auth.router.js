import express from "express";

import { login, logout, refresh, registration } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/registration', registration);
authRouter.post('/login', login);
authRouter.get('/refresh', refresh);
authRouter.post('/logout', logout);

export default authRouter;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
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
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 userName: example userName
 *                 email: exampleMail@gmail.com
 *                 _id: '65b52501fdddfb4dec5e9168'
 *                 createdAt: '2024-01-27T15:45:05.763Z'
 *                 updatedAt: '2024-01-27T15:45:05.763Z'
 *                 __v: 0
 *         headers:
 *           Set-Cookie accessToken:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwNjM3MTIwNn0.XerT5MoJKXE-_w0afHPEukkveEzHJk2FtXQQp7R9rQk; Path=/; HttpOnly
 *           Set-Cookie refreshToken:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwODk2MjMwNn0.FNSnJ72ZZOB26G9rlULxoh8FCZdTJXAFwFVNQo7ZHRA; Path=/; HttpOnly
 *       '400':
 *         description: Email already exist || userName already exist
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
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
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully authenticated user
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 userName: example userName
 *                 email: exampleMail@gmail.com
 *                 _id: '65b52501fdddfb4dec5e9168'
 *                 createdAt: '2024-01-27T15:45:05.763Z'
 *                 updatedAt: '2024-01-27T15:45:05.763Z'
 *                 __v: 0
 *         headers:
 *           Set-Cookie accessToken:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwNjM3MTIwNn0.XerT5MoJKXE-_w0afHPEukkveEzHJk2FtXQQp7R9rQk; Path=/; HttpOnly
 *           Set-Cookie refreshToken:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwODk2MjMwNn0.FNSnJ72ZZOB26G9rlULxoh8FCZdTJXAFwFVNQo7ZHRA; Path=/; HttpOnly
 *       '400':
 *         description: Incorrect userName || Incorrect email || Incorrect password
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh user tokens
 *     description: Update access token if you have valid refresh token
 *     tags: [Authentication]
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         description: to update access token
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MDVmZmFiMDU0YTFlODNhZGQxMGYiLCJpYXQiOjE3MDYzNjIzNjcsImV4cCI6MTcwODk1NDM2N30.qVxZxW9uiMpjq66BUTRkFX_CsorjBpS-fLFSSBquwYQ; Path=/; HttpOnly
 *     responses:
 *       '200':
 *         description: Successfully refreshed user tokens
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 _id: '65b3fb2bc57e7f387abf2ffb'
 *                 userName: example userName
 *                 email: exampleMail@gmail.com
 *                 createdAt: '2024-01-26T18:34:19.156Z'
 *                 updatedAt: '2024-01-27T15:17:40.129Z'
 *                 __v: 0
 *         headers:
 *           Set-Cookie accessToken:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwNjM3MTIwNn0.XerT5MoJKXE-_w0afHPEukkveEzHJk2FtXQQp7R9rQk; Path=/; HttpOnly
 *           Set-Cookie refreshToken:
 *             schema:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MjUwMWZkZGRmYjRkZWM1ZTkxNjgiLCJpYXQiOjE3MDYzNzAzMDYsImV4cCI6MTcwODk2MjMwNn0.FNSnJ72ZZOB26G9rlULxoh8FCZdTJXAFwFVNQo7ZHRA; Path=/; HttpOnly
 *       '401':
 *         description: User unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user and delete cookies
 *     tags: [Authentication]
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         description: to delete it from DB
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI1MDVmZmFiMDU0YTFlODNhZGQxMGYiLCJpYXQiOjE3MDYzNjIzNjcsImV4cCI6MTcwODk1NDM2N30.qVxZxW9uiMpjq66BUTRkFX_CsorjBpS-fLFSSBquwYQ; Path=/; HttpOnly
 *     responses:
 *       '200':
 *         description: Successfully logged out user
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: logout successful
 *       '500':
 *         description: Internal server error
 */