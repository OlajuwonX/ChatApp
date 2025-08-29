import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";
import ChatHeader from "./chat-header.jsx";
import MessageInput from "./message-input.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import MessageContent from "./message-content.jsx";

const ChatContainer = () => {
    const {getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore();

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]) //call use effect above the if conditions because it
    // has to run without
    // conditions.

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader/>
                <MessageSkeleton/>
                <MessageInput/>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>

            <MessageContent/>

            <MessageInput/>
        </div>
    )
}
export default ChatContainer
