import React from 'react'
import { getUserFromStorage } from '../../utils/getUserFromStorage'
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

//high order component 
const AuhtRoute = ({children}) => {
  // const user = useSelector(state=>state?.auth?.user);
  const token = getUserFromStorage();
  if(token){
    return children;
  }
  else{
     return < Navigate to="/login" />;
  }
}

export default AuhtRoute;
