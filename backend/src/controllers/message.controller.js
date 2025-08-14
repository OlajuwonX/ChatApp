import User from "../models/user.model.js";

export const usersSidebar = async (req, res) => {
try{
    const loggedInUserId = req.user._id; //user again because the route is protected by the protectRoute logic.
    const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); // this is just to filter the users that are not the current user_id. meaning return all userid except the id of the current user. and we are also not to return the hased password back to the client as best practice.

    res.status(200).json(filteredUsers);
} catch (error) {
    console.error("Error in usersSidebar",error.message);
    res.status(500).json({error: "Internal Server Error"});
}
}

//this is basically to fetch all users but not show ourselves in the contacts list.