import {v2 as cloudinary} from "cloudinary";

import {config} from "dotenv"

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary;

//after writing these lines of code, once images are uploaded we will be able to see them in the cloudinary bucket.
//the config is done in order to access the environmental variables. and also the v2 is renamed to cloudinary because it literarily makes more sense that way.