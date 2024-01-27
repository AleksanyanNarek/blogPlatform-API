import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upadateInfo, upadatePassword } from "../controllers/user.controller.js";

const usersRouter = express.Router();

usersRouter.patch('/update-info', isAuthenticated, upadateInfo);
usersRouter.patch('/update-password', isAuthenticated, upadatePassword);

export default usersRouter;