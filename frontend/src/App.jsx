import Navbar from "./components/Navbar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast";

const App = () => {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore(); //destructuring the useAuth state created from zustand.

    useEffect(() => {
        checkAuth();
    }, [checkAuth]); //this is to make sure immediately the webapp reloads, authentication is always confirmed.

    console.log({authUser});

    if (isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
    ) //this is for the loading spinner

    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={authUser ? <Home/> :
                    <Navigate to="login"/>}/>
                <Route path="/signup" element={!authUser ? <SignUp/> :
                    <Navigate to="/"/>}/>
                <Route path="/login" element={!authUser ? <Login/> :
                    <Navigate to="/"/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/profile"
                       element={authUser ? <Profile/> :
                           <Navigate to="login"/>}/>
            </Routes>

            <Toaster/>
        </div>
    )
}
export default App
