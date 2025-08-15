import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {Eye, EyeOff, Loader2, Lock, Mail, MessageSquare} from "lucide-react";
import {Link} from "react-router-dom";
import ImageContent from "../components/ImageContent.jsx";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {login, isLoggingin} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent browser reload.
        login(formData)
    }
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
                            disabled={isLoggingin}
                        >
                            {isLoggingin ? (
                                <>
                                    <Loader2
                                        className="size-5 animate-spin"/>
                                    Loading ...
                                </>
                            ) : (
                                "Log in"
                            )}
                        </button>
                    </form>

                    {/*Users With Account*/}
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Do you have an account?{" "}
                            <Link to="/signup"
                                  className="link link-primary">
                                Sign up
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
export default Login
