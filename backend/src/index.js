import express from 'express';
import authRoutes from './routes/auth.route.js'; //importing the route for authentication
import dotenv from 'dotenv';

import authRoute from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001; //use this to be able to run node on the port

app.use(express.json()) //use this to be able to access the json data.

app.use("/api/auth", authRoutes) //route for authentication


app.listen(PORT, () => {
    console.log("server is running on PORT " + PORT);
    connectDB();
});
