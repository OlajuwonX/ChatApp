
import express from "express";
import {login, logout, signup} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login) //for the signup route, it is .post because we are sending some data

router.post("/logout", logout) //for the signup route

router.post("/signup", signup) //for the signup route

export default router;