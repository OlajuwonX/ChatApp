import {useChatStore} from "../store/useChatStore.js";

const ChatPage = () => {
    const {selectedUser} = useChatStore();
    return (
        <div>ChatPage</div>
    )
}
export default ChatPage
