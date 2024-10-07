import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            user: "hungnvhe173464",
            pass: "hungambrose123"
        });
        console.log("MongoDB connect successful")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;