import {useState} from "react";
import {Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User} from "lucide-react";
import {Link} from "react-router-dom";
import ImageContent from "../components/ImageContent.jsx";
import toast from "react-hot-toast";
import {useAuthStore} from "../store/useAuthStore.js";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false); //this is for the show_password button, to make password visible.
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    }); //this is to store the form input.

    const {signup, isSigningUp} = useAuthStore(); //from useAuthStore, remember it is {} not []

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Enter your full name");
        if (!formData.email.trim()) return toast.error("Enter your email");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");

        return true;
    }; //this is to validate if any data is missing in any input fields and error will be returned.

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm(); //if the validateForm is
        // successful
        if (success === true) signup(formData);
    }; //this will handle the form submission. the (e) stands for event which prevents default, so the page will not
    // reload.
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/*Left Side*/}
            <div
                className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/*LOGO*/}
                    <div className="text-center mb-8">
                        <div
                            className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare
                                    className="size-6 text-primary"/>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create
                                Account</h1>
                            <p className="text-base-content/60">Get
                                Started with your free account</p>
                        </div>
                    </div>
                    {/*Form Section*/}
                    <form onSubmit={handleSubmit}
                          className="space-y-6">
                        {/*Full Name*/}
                        <div className="form-control">
                            <label className='label'>
                                <span
                                    className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User
                                        className="w-5 h-5 text-base-content/40"/>
                                </div>
                                <input
                                    type="text"
                                    className={"input input-bordered w-full pl-10 outline-none"}
                                    placeholder="Full Name"
                                    value={formData.fullName} //value coming from the state
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        fullName: e.target.value
                                    })} //this is
                                    // to update the field with the full name to prevent reload.
                                />
                            </div>
                        </div>

                        {/*Email*/}
                        <div className="form-control">
                            <label className='label'>
                                <span
                                    className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail
                                        className="w-5 h-5 text-base-content/40"/>
                                </div>
                                <input
                                    type="email"
                                    className={"input input-bordered w-full pl-10 outline-none"}
                                    placeholder="you@example.com"
                                    value={formData.email} //value coming from the state
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })} //this is
                                    // to update the field with the full name to prevent reload.
                                />
                            </div>
                        </div>

                        {/*Password*/}
                        <div className="form-control">
                            <label className="label">
                                <span
                                    className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock
                                        className="w-5 h-5 text-base-content/40"/>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={"input input-bordered w-full pl-10 outline-none"}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (<EyeOff
                                        className="w-5 h-5 text-base-content/40"/>) : (
                                        <Eye
                                            className="w-5 h-5 text-base-content/40"/>)}
                                </button>
                            </div>
                        </div>

                        {/*Submit Btn*/}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2
                                        className="size-5 animate-spin"/>
                                    Loading ...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/*Users With Account*/}
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login"
                                  className="link link-primary">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/*Right Side*/}
            <ImageContent
                title="Join our community"
                subtitle="Connect with friends, share moments and stay in touch loved ones."
            />
        </div>
    )
}
export default SignUp
