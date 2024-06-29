import { getUserFromStorage } from "../../../utils/getUserFromStorage";
import axios from "axios"


const token = getUserFromStorage();

//!==========Add TRansaction  API =============
export const addTransactionAPI = async({type, category , amount , date , description })=>{

   const response = await axios.post(`http://localhost:8000/api/v1/transactions/create`,{
       type, 
       category,
       amount,
       date,
       description
   },{
     headers:{
        Authorization:`Bearer ${token}`
     }
   });
  
   return response?.data ;
  };


  export const listTransactionAPI = async({type , category , startDate , endDate})=>{

   const response = await axios.get(`http://localhost:8000/api/v1/transactions/lists`,{
      params:{
         type,
         category,
         startDate,
         endDate
      },
     headers:{
        Authorization:`Bearer ${token}`
     }
   });
  
   console.log(response?.data);
   return response?.data ;
  };


  //!=======delete transaction=========
  export const deleteTransactionsAPI = async(id)=>{

   const response = await axios.delete(`http://localhost:8000/api/v1/transactions/delete/${id}`,{
     headers:{
        Authorization:`Bearer ${token}`
     }
   });
  
   return response?.data ;
  };

    //!=======delete transaction=========
    export const updateTransactionsAPI = async({amount , date , type , category , description ,id})=>{

      const response = await axios.put(`http://localhost:8000/api/v1/transactions/update/${id}`,{
         amount , date , type , category , description 
      },{
        headers:{
           Authorization:`Bearer ${token}`
        }
      });
     
      return response?.data ;
     };

  