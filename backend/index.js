import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
dotenv.config({});

const app = express();

app.get("/home", (req,res) => {
    return res.status(200).json({
        message: "Hello from Express",
        success: true
    })
})

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5678",
    credential: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 9990;

app.listen(PORT, () => {
    connectDB();
    console.log("server running at port "+ PORT);
})