export const signup = (req,res) => {
const {fullName, email, password} = req.body; //to access schemaData
    try{
        
    } catch (e) {
        
    } //use try,catch to catch errors to avoid breaking of code.
};

export const login = (req,res) => {
    res.send("login route");
};

export const logout = (req,res) => {
    res.send("logout route");
};
