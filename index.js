import express from 'express';
import dotenv from 'dotenv';
import { connectDB} from './config/connectDB.js'
import userRoute from './routes/userRoute.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/user",userRoute);



app.listen(PORT,()=>{
connectDB();
    console.log(`Server is running on port ${PORT}`);
})