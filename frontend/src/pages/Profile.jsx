import React from 'react'
import {useAuthStore} from "../store/useAuthStore.js";
import {Camera, Mail, User} from "lucide-react";

const Profile = () => {
    const {authUser, isUpdatingProfile, updateProfile} = useAuthStore()

    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; //this is to extract the file. and the [0] is the current file being elected.
        if (!file) return;  //if any file was not selected, return to initial state.

        const reader = new FileReader(); //to create a reader for the file to be uploaded.
        reader.readAsDataURL(file); //to read the file.

        reader.onloadend = async () => {
            const base64Image = reader.result; //this is to convert to base64 format.
            setSelectedImage(base64Image); //to update the profilePic state to the base64 image.
            await updateProfile({profile: base64Image});
        }
    }
    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-200 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className='mt-2'>Your profile information</p>
                    </div>

                    {/*Avatar upload section*/}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImage || authUser.profilePic || "/avatar.png"} //this is from the backend
                                // profilePic logic.
                                alt="Profile"
                                className="size-34 rounded-full object-cover border-2"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                            >
                                <Camera className="size-5 text-base-200"/>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "Uploading" : "Click the camera icon to upload your photo"}
                        </p>
                    </div>

                    {/*Profile inputs*/}
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className='size-4'/>
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                {authUser.fullName}
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="size-4"/>
                                Email Address
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                {authUser.email}
                            </p>
                        </div>
                    </div>

                    {/*Additional information*/}
                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium mb-4">
                            Account information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile

