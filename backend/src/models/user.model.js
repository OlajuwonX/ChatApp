import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profilePic: {
        type: String,
        default: '',
    },
},
    {timestamps: true}
)

// To check if model already exists before creating it.
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

//for the profilePic, it isn't necessary hence why we are leaving it as default: "" empty string, so it can be uploaded later or left alone. timstamps, is to get the timing of the createdAt and other functions.
