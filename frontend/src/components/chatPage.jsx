import {useChatStore} from "../store/useChatStore.js";
import Sidebar from "./Sidebar.jsx";
import NoChatSelected from "./NoChatSelected.jsx";
import ChatContainer from "./ChatContainer.jsx";

const ChatPage = () => {
    const {selectedUser} = useChatStore();
    return (
        <div className="h-full bg-base-200">
            <div className="flex items-center justify-center pt-15 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar/>

                        {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatPage
