import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import connectDB from './utils/db.js';

app.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
    connectDB();
});