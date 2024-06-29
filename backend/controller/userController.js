const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../model/User");

const userController = {
    //!register
    register :asyncHandler(async(req, res)=>{
        const {username , email , password} = req.body;
        //validating the inputs
        if(!username || !email || !password){
           throw new Error("Please provide all fields");
        }
        //checking if user already exists 
        const userExists  = await User.findOne({email});
        if(userExists){
           throw new Error("User already exists ");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(password,salt);
        // else create user
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        });

        //send the response 
        return res.status(201).json({
            username:newUser.username,
            email:newUser.email,
            id:newUser._id
        })
    }),

    //!login

    login : asyncHandler(async(req, res)=>{
      const {email , password} = req.body;

      //check user correct 
      const userFound = await User.findOne({email});
      if(!userFound){
        throw new Error('Invalid Login Credentials');
      }
      
      //check password is correct 
      const isMatched = await bcrypt.compare(password , userFound.password);
      if(!isMatched){
        throw new Error('Invalid Login Credentials');
      }

      //generate token 
      const token = jwt.sign({ id:userFound._id }, process.env.JWT_SECRET_KEY ,{
        expiresIn:"30d"
      });

      //sending the reponse 
      return res.json({
        message: "Login success",
        token,
      });

    }),

    //!profile
    profile:asyncHandler(async(req , res)=>{
       const id = req?.user;
       const userFound = await User.findById(id);
       if(!userFound){
          throw new Error("User Not Found");
       }
      
       return res.json({
        username:userFound?.username,
        email : userFound?.email
       });
      
    }),

    //!change user password 
    changeUserPassword : asyncHandler(async(req, res)=>{
      const {newPassword} = req.body;
      //find user 
      const userFound = await User.findById(req?.user);
      if(!userFound){
        throw new Error("User Not Found");
      }

      //if user found 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword  = await bcrypt.hash(newPassword,salt);

      //updating the password 
      userFound.password = hashedPassword;
      await userFound.save();

      //send the reponse 
      return res.json({
        message:"User Password Changed Successfully"
      });
    }),

    
    //!update user profile 
    updateUserProfile: asyncHandler(async(req, res)=>{
      const {email , username} = req.body;

      //find the user 
      const updatedUser = await User.findByIdAndUpdate(req?.user , {
        email,
        username
      },{
        new:true
      }); 

      if(!updatedUser){
        throw new Error(" User Updation Failed");
      }

      //is user updates successfully send the response 
      return res.json({
        message:'user updated successfully',
        email:updatedUser?.email,
        username:updatedUser?.username
      });
    }) 
}

module.exports = userController;
