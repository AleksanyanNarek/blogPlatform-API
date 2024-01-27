import dotenv from 'dotenv';
dotenv.config();

import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "Please enter your userName"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value){
                return emailRegexPattern.test(value);
            },
            message: "please enter a valid email"
        },
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    }
}, {timestamps: true});

//Hash Password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

const UserModel = model("User", userSchema);

export default UserModel;