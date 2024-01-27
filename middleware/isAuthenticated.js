import jwt from "jsonwebtoken";

import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "./catchAsyncErrors.js";
import UserModel from '../models/user.model.js';

// check is isAuthenticated
export const isAuthenticated = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { accessToken } = req.cookies;
            
            if (!accessToken) {
                return next(new ErrorHandler("Please login to access this resource", 401));
            }

            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            if (!userData) {
                return next(new ErrorHandler("access token is not valid", 401));
            }

            const user = await UserModel.findById(userData.userId);
            if (!user) {
                return next(new ErrorHandler("Please login to access this resource", 401));
            }

            req.body.user = user;
            next();

        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);