import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    }
}, {timestamps: true}
    );

const Message = mongoose.model("Message", messageSchema);

export  default Message

//the receiverId and senderId both have mongoose.schema.Types.ObjectId because they are both authenticated, so it has to confirm of they are both authenticated before an operation happens
//the text and images field do not have the required field because sometimes some messages can only be text and sometimes it can only be a message.
//timestamps is just to show the exact time the action was created.