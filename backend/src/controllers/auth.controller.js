import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import {generateToken} from "../lib/utils.js";

export const signup = async (req,res) => {
const {fullName, email, password} = req.body; //to access schemaData
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({error: "All fields are required"});
        }

        if (password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters"}); //the 400 status triggers the error message that will be displayed on the screen
        }
        const user = await User.findOne({email})

        if (user) return res.status(400).json({message: "Email already exists"});
        //to hash passwords
        const salt = await bcrypt.genSalt(10); //10 has to be added as the commission
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        }) //this is to return new data after sign up

        if(newUser) {
            //to generate json web token (jwt) which is unique to each user. and exists to confirm user data.
            generateToken(newUser._id, res)//it is ._id because mongodb returns id as _id, and res is to send the cookie in the response.
            await newUser.save(); //this is to save the user in the database.

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            }); // this informs that the new user has been created successfully.
        } else {
            res.status(400).json({message:"Invalid user data"});
        } //this is to verify if user data is correct.

    } catch (error) {
        console.error("Error in signup controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    } //use try,catch to catch errors to avoid breaking of code.
};

export const login = async (req,res) => {
   const {email, password} = req.body;
    try {
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({error: "Invalid Credentials"}); // we use invalid credentials basically so malicious users do not know which field they are getting wrong.
        }

    } catch{

    }
};

export const logout = (req,res) => {
    res.send("logout route");
};

//in the try we sign_up new users, hash their passwords and create a token to let them know they are authenticated.
//to hash passwords we will be using the bcryptjs, it coverts normal passwords like {john_doe123} to gibberish like mfhdkbs_ddnasjd-fuif332jj.