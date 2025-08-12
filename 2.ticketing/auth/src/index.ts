import mongoose from "mongoose";
import { app } from "./app";

app.listen(3000, async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY env not defined");
    }
    try {
        await mongoose.connect("mongodb://auth-mongo-clusterip-srv:27017/auth");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    console.log("Auth is running on port 3000!!");
});
