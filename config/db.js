import mongoose from "mongoose";

const connectDB = async() => {
   try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`Connected to MongoDB Database`.bgMagenta.white);
   } catch (error) {
      console.log(`Error in connecting database: ${error}`.bgRed.white);
   }
}

export default connectDB;