import mongoose from "mongoose";
import { app } from "./app";

app.listen(3000, async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY env not defined");
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI env not defined")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    console.log("Tickets is running on port 3000!!");
});
