import axios from "axios" ;
import { getUserFromStorage } from "../../../utils/getUserFromStorage";
import {useSelector} from "react-redux"

const token = getUserFromStorage();
//!==========Login API =============
export const userLoginAPI = async({email , password})=>{
 const response = await axios.post(`http://localhost:8000/api/v1/users/login`,{
    email , 
    password
 });

 return response?.data ;
};

//!==========Register API =============
export const userRegisterAPI = async({email , password , username})=>{
   const response = await axios.post(`http://localhost:8000/api/v1/users/register`,{
      email , 
      password,
      username
   });
  
   return response?.data ;
  };

  //!==========update API =============
  export const updateProfileAPI = async({email , username})=>{
   const response = await axios.put(`http://localhost:8000/api/v1/users/update-user-profile`,{
    email, username
   },{
      headers:{
         Authorization:`Bearer ${token}`
      }
    });
  
   return response?.data ;
  };


  //!=====update password ==========
 
export const updatePasswordAPI = async({newPassword})=>{
   console.log("ememle",newPassword);
   const response = await axios.put(`http://localhost:8000/api/v1/users/change-user-password`,{
    newPassword
   },{
      headers:{
         Authorization:`Bearer ${token}`
      }
    });
  
   return response?.data ;
  };

//!=======get user profile =============
  export const getProfileAPI = async()=>{

   const response = await axios.get(`http://localhost:8000/api/v1/users/profile`,{
      headers:{
         Authorization:`Bearer ${token}`
      }
    });
  
   return response?.data ;
  };