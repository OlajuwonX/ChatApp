import express from 'express';
import authRoutes from './routes/auth.route.js'; //importing the route for authentication
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import {app, server} from "./lib/socket.js";


console.log('🟡 Step 1: Basic imports successful');

dotenv.config();
console.log('🟡 Step 2: dotenv configured');
// const app = express(); //for the whole project to run on express. we initially used this from the start of the
// app, now we are moving to socket.io's server.


const PORT = process.env.PORT || 5001; //use this to be able to run node on the port
console.log('🟡 Step 3: Express app created');

const __dirname = path.resolve();
console.log('dirname path created');

app.use(express.json()); //use this to be able to extract the json data from the body.
app.use(cookieParser()); //allows you to use cookie-parser
console.log('🟡 Step 4: Middleware added');

app.use(cors({
        origin: ["http://localhost:5173",
            "http://127.0.0.1:5173"
        ], //these are the frontend links
        credentials: true, //this allows cookies and authorizations to be sent to the frontend.
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
    })
); //use this to be able to run backend api on frontend links.
console.log('🟡 Step 5: CORS configured');

// Handle preflight requests explicitly
app.options('*', cors());

app.use("/api/auth", authRoutes) //route for authentication
console.log('✅ Auth routes import successful');

app.use("/api/messages", messageRoutes) //route for message action

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    })
}// for production, to use the dist which is a broken down version of the front end.

server.listen(PORT, () => {
    console.log("server is running on PORT " + PORT);
    connectDB();
}); //we initially used app, now we are using server for socket.io realtime function


//to grab token from the cookie, use cookie-parser.
