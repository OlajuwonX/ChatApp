import {create} from "zustand"

export const useAuthStore = create((set) =>({
    authUser: null, //to check if user is authenticated.

    isCheckingAuth: true, //for the loading state.
})) //we are passing a call back function here.

//zustand is a global state management tool. so we will be having all our global state management here.