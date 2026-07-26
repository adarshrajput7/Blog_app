import mongoose, { connect } from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("mongoose Error Ladle",error);
        
    }
}

export default connectDB