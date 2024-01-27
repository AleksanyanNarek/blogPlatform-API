import dotenv from 'dotenv';
dotenv.config();

import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const upadateInfo = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { userName, email, user } = req.body;

            const options = { new: true, runValidators: true, context: 'query' };

            const newUser = await UserModel.findByIdAndUpdate(user._id, { userName, email }, options)
            
            res.status(200).json({
                success: true,
                user: newUser
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const upadatePassword = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { oldPassword, newPassword, email } = req.body;
            
            const user = await UserModel.findOne({ email }).select("+password");
            if(!user){
                return next(new ErrorHandler("Incorrect email", 400));
            }

            const isPassEquals = await bcryptjs.compare(oldPassword, user.password);
            if(!isPassEquals){
                return next(new ErrorHandler("Incorrect password", 400));
            }
            
            user.password = newPassword;
            await user.validate();
            user.save();

            const userWithoutPassword = { ...user.toObject() };
            delete userWithoutPassword.password;

            res.status(200).json({
                success: true,
                user: userWithoutPassword
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)