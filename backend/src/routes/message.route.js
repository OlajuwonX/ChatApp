import express from 'express';
import {protectRoute} from "../middleware/protectRoute.js";
import {usersSidebar} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, usersSidebar); //this will fetch the users that will be on the sidebar.

export default router;