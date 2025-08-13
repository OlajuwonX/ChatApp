import express from "express";
import {login, logout, signup, updateProfile} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/login", login) //for the signup route, it is .post because we are sending some data

router.post("/logout", logout) //for the signup route

router.post("/signup", signup) //for the signup route

router.put("/update-profile", protectRoute, updateProfile
) //this is for the profile picture, and we are using put because we are inserting something/it is receiving data. this route will only allow for profile picture uploads.

export default router;


//we are protecting the updateProfile route because the user has to be authenticated before he is able to make changes to the profile.
