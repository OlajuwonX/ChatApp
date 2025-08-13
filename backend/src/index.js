import express from 'express';
import authRoutes from './routes/auth.route.js'; //importing the route for authentication
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoute from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js";

dotenv.config();
const app = express(); //for the whole project to run on express.

const PORT = process.env.PORT || 5001; //use this to be able to run node on the port

app.use(express.json()) //use this to be able to extract the json data from the body.

app.use(cookieParser()); //allows you to use cookie-parser

app.use("/api/auth", authRoutes) //route for authentication

app.listen(PORT, () => {
    console.log("server is running on PORT " + PORT);
    connectDB();
});

//to grab token from the cookie, use cookie-parser.
