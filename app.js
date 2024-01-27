import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';

import { ErrorMiddleware } from './middleware/error.js';
import router from './routes/index.js';

export const app = express();

//body parser
app.use(express.json({limit: "50mb"}));

//cookie parser
app.use(cookieParser());

//cors
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = process.env.ORIGIN;

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

// routes
app.use('/api/v1', router);

//testing api
app.get('/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is working'
    })
})

//unknown route
app.all('*', (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);

    err.statusCode = 404;
    next(err);
})

app.use(ErrorMiddleware);