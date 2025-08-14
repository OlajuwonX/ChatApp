import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";


// Logic for the authenticated users sidebar and get messages between users.
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

export const getMessages = async (req, res) => {
    try{
        const {id: usersChatId}=req.params; //we will use dynamic values, and it is id because that was what we called it in the message routes {:id}. so we are renaming it to usersChatId.
        const myId = req.user._id; //id of the current user.

        const messages =await Message.find({
            $or: [
                {senderId: myId, receiverId: usersChatId},
                {senderId: usersChatId, receiverId: myId}
            ]
        }); //this is to basically get the messages between the two users, either the one initiated by the sender or the one initiated by the receiver. MyId is the current user_id.

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages",error.messages);
        res.status(500).json({error: "Internal Server Error"});
    }
}

// Logic for the receiving end of the messages sent from the currentId.
export const sentMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const {id:receiverId}=req.params; //renaming this dynamic id as receiver_id, same way we did with my_id.
        const senderId = req.user._id;//current user id.

        let imageUrl; //this is in case the message is an image.
        if (image) {
            //Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        }); // this is to return the new message.

        await newMessage.save(); //this is to save the new message.

        //to do, implement realtime functionality. => via socket.io

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessages",error.messages);
        res.status(500).json({error: "Internal Server Error"});
    }
} //the message sent could either be a text or an image.

//this is basically to fetch all users but not show ourselves in the contacts list.