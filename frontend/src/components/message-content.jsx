import {useChatStore} from "../store/useChatStore.js";
import {useAuthStore} from "../store/useAuthStore.js";
import {formatMessageTime} from "../lib/utils.js";

const MessageContent = () => {
    const {messages, selectedUser} = useChatStore();
    const {authUser} = useAuthStore();

    return (
        //All the message UI are from daisy ui classes.
        <div className="mx-2 gap-3 flex-1 flex flex-col overflow-auto">
            {messages.map((message) => (
                <div
                    key={message._id}
                    className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>

                    {/*Profile Picture*/}
                    <div className="chat-image avatar">
                        <div className='size-10 rounded-full border'>
                            <img
                                src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                                alt="Profile Pic"
                            />
                        </div>
                    </div>

                    {/*Message time stamp*/}
                    <div className="chat-header mb-1">
                        <time className="text-xs opacity-50 md:text-base-100">
                            {formatMessageTime(message.createdAt)}
                        </time>
                    </div>

                    {/*Chat bubble to display messages*/}
                    <div className="chat-bubble flex">
                        {message.image && (
                            <img
                                src={message.image}
                                alt="Attachment"
                                className="rounded-md p-1 sm:max-w-[150px]"/>
                        )}
                        {message.text && <p>{message.text}</p>}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MessageContent
