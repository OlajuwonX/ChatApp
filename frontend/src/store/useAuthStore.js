import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null, //to check if user is authenticated. set is the initial state.
    isSigningUp: false, //for the loading effect on the signup button.
    isLoggingIn: false,
    isUpdatingProfile: false,


    isCheckingAuth: true, //for the loading state, this function is called immediately when the webapp is visited.
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");  //this is to call the check logic from the backend, the check is to confirm if the user is authenticated.

            set({authUser: res.data}); //this is the setAuthUserState.
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

        } catch (error) {
            toast.error(error.response.data.message); //this to grab the signup data and return false if data is
            // incorrect.
            console.log("Error in signing up", error.message);
        } finally {
            set({isSigningUp: false});
        }
    }, //this is the toast for  the signup state

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
})) //we are passing a call back function here.


//zustand is a global state management tool. so we will be having all our global state management here.