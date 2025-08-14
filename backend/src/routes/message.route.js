import express from 'express';
import {protectRoute} from "../middleware/protectRoute.js";
import {getMessages, sentMessage, usersSidebar} from "../controllers/message.controller.js";

const router = express.Router();

// Endpoints for the authenticated users sidebar and messages between users.
router.get("/users", protectRoute, usersSidebar); //this will fetch the users that will be on the sidebar.
router.get("/:id", protectRoute, getMessages); //this is to get the messages between two distinct users/the whole chat between two different users.

// Endpoint for the receiver of the message.
router.post("/sender:id", protectRoute, sentMessage); //this is for the person receiving the message.


export default router;