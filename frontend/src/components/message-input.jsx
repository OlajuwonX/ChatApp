import {useRef, useState} from "react";
import {useChatStore} from "../store/useChatStore.js";
import {Image, Send, X} from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);
    const {sendMessage} = useChatStore()

    // Function to handle select image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image"); //in case file selected is not an image.

        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file); //this is to set the image preview state.
    }

    // Function to remove selected image
    const handleRemoveImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = ""; //just to trigger the remove function.
    }

    // Function to handle sent message
    const handleSendMessage = async (e) => {
        e.preventDefault(); //to prevent page refresh
        if (!text.trim() && !imagePreview) return;  //if no text or image is being sent, do not do anything
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            //Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = ""; //to clear the input form after message has
            // been sent.

        } catch (error) {
            toast.error("Message not sent");
            console.error("Failed to send a message:", error.message);
        }
    }

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="size-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300"
                                onClick={handleRemoveImage}
                                type="button">
                            <X className="size-3"/>
                        </button>
                    </div>
                </div>
            )}

            {/*For the form input,the message box*/}
            <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
            >
                <div className="flex flex-1 gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Type a message here..."
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20}/>
                    </button>
                </div>

                {/*Send button*/}
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22}/>
                </button>
            </form>
        </div>
    )
}
export default MessageInput
