import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'}); //after generating the jwt, we send it into the cookies. the token will live in the cookie for a total of 7days before it expires. so when the token expires, you have to log in once again.

    //to send token into the cookies
    res.cookie('jwt', token, {
        maxAge: 7 * 60 * 60 * 1000, //Should be in milliseconds instead of just writing 7days as stated above
        httpOnly: true, // this is done to prevent XSS attacks, cross-site scripting attacks(javascript access)
        sameSite: 'strict', // this prevents CSRF attacks cross-site request forgery attacks.
        secure: process.env.NODE_ENV !== 'development', //this is to tell it that it will be true when we are in production. but since we are in development this line will return as false.
    });

    return token;
} // this is to generate the json web token.

//we named it userId because it is the payload, that is what we renamed the token to be.