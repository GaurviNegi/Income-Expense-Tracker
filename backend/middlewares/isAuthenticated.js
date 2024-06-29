const jwt = require("jsonwebtoken");
const isAuthenticated = async(req ,res , next )=>{
     const headerObj = req.headers;
     //token is second parameter 
     const token = headerObj?.authorization?.split(' ')[1];
     const verifyToken =  jwt.verify(token , process.env.JWT_SECRET_KEY ,(err , decoded)=>{
        if(err)return false;
        else return decoded;
     });

     if(verifyToken){
        req.user = verifyToken?.id
        next();
     }
     else{
       const err =  new Error("User Not Authorized");
        next(err);
     }   
}
module.exports = isAuthenticated;