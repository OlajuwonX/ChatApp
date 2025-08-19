import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    messages: [], //the initial state of the chatroom which is always empty
    users: [],
    selectedUser: null,
    isUsersLoading: false, //this is for the skeleton ui before the users load.
    isMessagesLoading: false, //skeleton while messages are loading.
    // setSelectedUser: false,

    getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/users"); //from the backend endpoint.
            set({users: res.data}); //to receive data from the frontend.
        } catch (error) {
            console.error("❌ Error fetching users:", error);
            console.error("Error response:", error.response?.data);

            // ✅ Fixed error handling
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to fetch users";
            toast.error(errorMessage);
            set({users: []}); // Reset users on error
        } finally {
            set({isUsersLoading: false});
        }
    }, //for the users logic

    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`); //to fetch message data from the particular
            // userId
            set({messages: res.data}); //send the data to the backend to update the state.
        } catch (error) {
            console.error("❌ Error fetching messages:", error);
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to fetch messages";
            toast.error(errorMessage);
        } finally {
            set({isMessagesLoading: false});
        }

    }, //we are passing the userId so we know the message we are opening, cos it is tied individually to the userid

    setSelectedUser: (selectedUser) => set({selectedUser}) //this is to change the selected user state.
}))
