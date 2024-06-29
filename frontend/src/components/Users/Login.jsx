import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {useDispatch} from "react-redux"
import { FaEnvelope, FaLock } from "react-icons/fa";
import { userLoginAPI } from "../API/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

//defining the validation schema for the formik 
const validationSchema = Yup.object({
  email:Yup.string().email("Inavlid Email type").required("Email is required"),
  password : Yup.string().required("Password is required")
});


//component 
const LoginForm = () => {
  //navigation 
  const navigate = useNavigate();
  //mutation and destructuring the output
  const {mutateAsync , isError , isPending , error , isSuccess} = useMutation({
    mutationFn:userLoginAPI,
    mutationKey:['login']
  });

  //useDispatch
  const dispatch = useDispatch();

  //defining the formik 
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema,
    onSubmit:(values)=>{
       mutateAsync(values).then(data=>{
        dispatch(loginAction(data));
        localStorage.setItem("userInfo" , JSON.stringify(data));
        navigate("/profile");
       }).catch(err=>console.log(err));
    }
  });


  return (
    <form onSubmit={formik.handleSubmit } className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Display messages */}

      {isError && <AlertMessage type="error" message={error.response.data.message}/>}

      {isSuccess && <AlertMessage type="success" message="Login Success"/>}

      {isPending && <AlertMessage type="loading" message="Login Please wait..."/>}


      <p className="text-sm text-center text-gray-500">
        Login to access your account
      </p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;