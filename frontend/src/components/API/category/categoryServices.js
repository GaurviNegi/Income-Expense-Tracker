import { getUserFromStorage } from "../../../utils/getUserFromStorage";
import axios from "axios"


const token = getUserFromStorage();

//!==========Add Category  API =============
export const addCategoryAPI = async({ name , type })=>{

   const response = await axios.post(`http://localhost:8000/api/v1/categories/create`,{
      name , type
   },{
     headers:{
        Authorization:`Bearer ${token}`
     }
   });
  
   return response?.data ;
  };


  //!==========list Categories  API =============
export const listCategoryAPI = async()=>{
   const response = await axios.get(`http://localhost:8000/api/v1/categories/lists`,{
     headers:{
        Authorization:`Bearer ${token}`
     }
   });
  
   return response?.data ;
  };

  //!==========Update Category API =============
export const updateCategoryAPI = async({ name , type , id})=>{

    const response = await axios.put(`http://localhost:8000/api/v1/categories/update/${id}`,{
       name , type
    },{
      headers:{
         Authorization:`Bearer ${token}`
      }
    });
   
    return response?.data ;
   };


//!==========delete Category API =============
export const deleteCategoryAPI = async(id)=>{

    const response = await axios.delete(`http://localhost:8000/api/v1/categories/delete/${id}`,{
      headers:{
         Authorization:`Bearer ${token}`
      }
    });
   
    return response?.data ;
   };
   