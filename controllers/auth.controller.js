import dotenv from 'dotenv';
dotenv.config();
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { generateAndSaveTokens } from '../services/token.service.js';
import UserModel from '../models/user.model.js';
import TokenModel from "../models/token.model.js";

export const registration = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { userName, email, password } = req.body;

            const emailCandidate = await UserModel.findOne({ email });
            if(emailCandidate){
                return next(new ErrorHandler("Email already exist", 400));
            }

            const userNameCandidate = await UserModel.findOne({ userName });
            if(userNameCandidate){
                return next(new ErrorHandler("userName already exist", 400));
            }

            const user = await UserModel.create({ userName, email, password });

            const refreshTokenExpireTime = process.env.REFRESH_TOKEN_EXPIRE * 24*60*60; // REFRESH_TOKEN_EXPIRE days in seconds
            const accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE * 60; // ACCESS_TOKEN_EXPIRE minutes in seconds

            const { refreshToken, accessToken } = await generateAndSaveTokens({ userId: user._id }, refreshTokenExpireTime, accessTokenExpireTime )

            res.cookie('refreshToken', refreshToken, { maxAge: refreshTokenExpireTime*1000, httpOnly: true });
            res.cookie('accessToken', accessToken, { maxAge: accessTokenExpireTime*1000, httpOnly: true });

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

export const login = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { userName, email, password } = req.body;

            const user = await UserModel.findOne({ userName }).select("+password");
            if(!user){
                return next(new ErrorHandler("Incorrect userName", 400));
            }

            if(user.email !== email){
                return next(new ErrorHandler("Incorrect email", 400));
            }

            const isPassEquals = await bcryptjs.compare(password, user.password);
            if(!isPassEquals){
                return next(new ErrorHandler("Incorrect password", 400));
            }

            const refreshTokenExpireTime = process.env.REFRESH_TOKEN_EXPIRE * 24*60*60; // REFRESH_TOKEN_EXPIRE days in seconds
            const accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE * 60; // ACCESS_TOKEN_EXPIRE minutes in seconds

            const { refreshToken, accessToken } = await generateAndSaveTokens({ userId: user._id }, refreshTokenExpireTime, accessTokenExpireTime )

            res.cookie('refreshToken', refreshToken, { maxAge: refreshTokenExpireTime*1000, httpOnly: true });
            res.cookie('accessToken', accessToken, { maxAge: accessTokenExpireTime*1000, httpOnly: true });
            
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

export const refresh = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { refreshToken: oldRefreshToken } = req.cookies;

            if(!oldRefreshToken) {
                return next(new ErrorHandler("User unauthorized", 401));
            }
            const userData = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
            const isEquelWithDB = await TokenModel.findOne({ refreshToken: oldRefreshToken });
    
            if(!userData || !isEquelWithDB){
                return next(new ErrorHandler("User unauthorized", 401));
            }

            const user = await UserModel.findById(userData.userId);
    
            const refreshTokenExpireTime = process.env.REFRESH_TOKEN_EXPIRE * 24*60*60; // REFRESH_TOKEN_EXPIRE days in seconds
            const accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRE * 60; // ACCESS_TOKEN_EXPIRE minutes in seconds

            const { refreshToken, accessToken } = await generateAndSaveTokens({ userId: user._id }, refreshTokenExpireTime, accessTokenExpireTime )

            res.cookie('refreshToken', refreshToken, { maxAge: refreshTokenExpireTime*1000, httpOnly: true });
            res.cookie('accessToken', accessToken, { maxAge: accessTokenExpireTime*1000, httpOnly: true });

            res.status(200).json({
                success: true,
                user   
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)

export const logout = CatchAsyncError(
    async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;

            await TokenModel.deleteOne({ refreshToken });
            
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');

            res.status(200).json({
                success: true,
                message: "logout successful"
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
)