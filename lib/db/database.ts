import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("MongoDB is already connected")
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URL!, {
            dbName: "books",
        })
    } catch(error) {
        console.log(error);
    }
}