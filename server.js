import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import inventoryRoute from './routes/inventoryRoute.js';
import analyticsRoute from './routes/analyticsRoute.js';
import adminRoute from "./routes/adminRoute.js";

const app = express();
dotenv.config();

//MongoDB Database connection
connectDB();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

//Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/inventory', inventoryRoute);
app.use("/api/v1/analytics", analyticsRoute);
app.use("/api/v1/admin", adminRoute);

//Server listening
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
   console.log(`Server is listening on port: ${PORT}`.bgBlue.white);
})