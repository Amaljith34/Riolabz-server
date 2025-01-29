import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv'
import adminRouter from "./routes/adminRoutes.js";
import baseRouter from "./routes/baseRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config()
const app=express()
const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/admin',adminRouter)
app.use('/api',baseRouter)
app.use('/api/user',userRouter)


async function main(){
    try { 
        await mongoose.connect(process.env.MONGODB_CONNECTION)
        console.log("MongoDB connected successful");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}
main()

app.listen(PORT,()=>{
    console.log(`Server Running At ${PORT}`);
})