import jwt from "jsonwebtoken";
import TokenModel from "../models/token.model.js";

export const generateAndSaveTokens = async ( payload, refreshTokenExpireTime, accessTokenExpireTime ) => {

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: refreshTokenExpireTime });
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: accessTokenExpireTime });
    
    const tokenData = await TokenModel.findOne({ user: payload.userId });
    
    if(tokenData){
        tokenData.refreshToken = refreshToken;
        tokenData.save();

        return {
            refreshToken,
            accessToken
        }
    }

    await TokenModel.create({ user: payload.userId, refreshToken });

    return {
        refreshToken,
        accessToken
    }
}