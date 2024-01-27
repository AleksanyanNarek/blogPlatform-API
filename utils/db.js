import mongoose from "mongoose";

const dbUrl = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then(( data ) => {
            console.log(`Database connected with ${data.connection.host}`);
        })
    } catch (error) {
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;