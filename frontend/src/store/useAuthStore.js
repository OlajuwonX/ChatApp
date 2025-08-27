import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import io from "socket.io-client";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
    authUser: null, //to check if user is authenticated. set is the initial state.
    isSigningUp: false, //for the loading effect on the signup button.
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true, //for the loading state, this function is called immediately when the webapp is visited.
    onlineUsers: [],
    socket: null, //for the socket.io client


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");  //this is to call the check logic from the backend, the check is to confirm if the user is authenticated.
            set({authUser: res.data}); //this is the setAuthUserState.
            get().connectSocket()

        } catch (error) {
            console.log("Error in CheckAuth", error.message)
            set({authUser: null}); //then this means user is not authenticated. that is if it gets to this point.
        } finally {
            set({isCheckingAuth: false});
        }

    },

    signup: async (data) => {
        set({isSigningUp: true}); //to indicate the signup action is ongoing
        try {
            const res = await axiosInstance.post("/auth/signup", data); //this is to return the data the user sends
            // from the signup page
            set({authUser: res.data}); //this is to mke sure the data is authenticated when they successfully sign up.
            toast.success("Account created successfully");

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message); //this to grab the signup data and return false if data is
            // incorrect.
            console.log("Error in signing up", error.message);
        } finally {
            set({isSigningUp: false});
        }
    }, //this is for the signup state

    login: async (data) => {
        set({isLoggingIn: true}); //to update the state
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Logged in successfully");

            get().connectSocket()
        } catch (error) {
            toast.error("Incorrect Email and Password", error.message);
        } finally {
            set({isLoggingIn: false});
        }

    }, //this is for the login.

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }, //this is for the logout state

    updateProfile: async (data) => {
        set({isUpdatingProfile: true}); //to update the profile Picture uploading state.
        try {
            const res = await axiosInstance.put("/auth/update-profile", data); //this is to call the logic from the backend

            set({authUser: res.data}); //to update on the front end.
            toast.success("Profile image updated successfully");
        } catch (error) {
            console.log("Error in uploading profile image", error.message);
            const errorMessage = error.response?.data?.message || "Profile image update error";
            toast.error(errorMessage);
        } finally {
            set({isUpdatingProfile: false});
        }
    }, //to update the profile image to the database.

    //For the socketIO functions.

    connectSocket: () => {
        const {authUser} = get()
        if (!authUser || get().socket?.connected) return; //this is to indicate that a connection will not be
        // created for unAuthenticated users. or when we are connected, do not create a new connection.
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id, //passing from the backend socket.js
            }
        });
        socket.connect();

        set({socket: socket}) //this is to set the socket state.

        // socket.on is used to listen to events
        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect() //only disconnect if a previous connection exists.
    }

})) //we are passing a call back function here.


//zustand is a global state management tool. so we will be having all our global state management here.
// get is used to get access to functions in another functions.