import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set) =>({
    authUser: null, //to check if user is authenticated. set is the initial state.
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,


    isCheckingAuth: true, //for the loading state, this function is called immediately when the webapp is visited.
    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");  //this is to call the check logic from the backend, the check is to confirm if the user is authenticated.

            set({authUser: res.data}); //this is the setAuthUserState.
        } catch (error) {
            console.log("Error in CheckAuth",error.message)
            set({authUser: null}); //then this means user is not authenticated. that is if it gets to this point.
        }
        finally {
            set({isCheckingAuth: false});
        }
        
    },
})) //we are passing a call back function here.

//zustand is a global state management tool. so we will be having all our global state management here.