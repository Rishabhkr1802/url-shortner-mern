import mongoose from "mongoose";

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MongoDB_URI);
        console.log(`Mongo Database is connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error occuring during database connection: ${error}`);
        process.exit(1);
    }
}

export default connectDB;