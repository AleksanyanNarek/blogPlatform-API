import express from "express";

import { login, logout, refresh, registration } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/registration', registration);
authRouter.post('/login', login);
authRouter.get('/refresh', refresh);
authRouter.post('/logout', logout);

export default authRouter;