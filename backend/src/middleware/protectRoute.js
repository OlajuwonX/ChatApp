import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt; //jwt is the name of the token in utils.js.

        if (!token) {
            return res.status(401).json({message:"Unauthorised - No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //this line is used to decode the token, and the JWT_SECRET is the key we created to decode the token.
        if (!decoded) {
            return res.status(401).json({message:"Unauthorised - Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); //this line is to view through the decoded/verified-token to look for the userId field that exists in it, and pass the information. The .select("-password") is to make sure the password isn't returned to the client.
        if (!user) {
            return res.status(404).json({message:"User not found"}); //this is just to check if user does not exist, although it is rarely called.
        }

        req.user = user; //the user is what we call anytime we need a protected route function.
        return next(); //this means if the user exists, then it should proceed to the next function.

    } catch (e) {
        console.log("Error in ProtectRoute middleware",e.message);
        res.status(401).json({message:"Internal server error"});
    }
}

