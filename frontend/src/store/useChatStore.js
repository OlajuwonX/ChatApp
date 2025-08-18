import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    messages: [], //the initial state of the chatroom which is always empty
    users: [],
    selectedUser: null,
    isUsersLoading: false, //this is for the skeleton ui before the users load.
    isMessagesLoading: false, //skeleton while messages are loading.

    getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/users"); //from the backend endpoint.
            set({users: res.data}); //to receive data from the frontend.
        } catch (error) {
            toast.error(error.response?.data?.error?.message);
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
            toast.error(error.response?.data?.error?.message);
        } finally {
            set({isMessagesLoading: false});
        }
    } //we are passing the userId so we know the message we are opening, cos it is tied individually to the userid
}))
