import React from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation ,useQuery } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import { getProfileAPI, updateProfileAPI } from "../API/users/userServices";
import * as Yup from "yup"
import AlertMessage from "../Alert/AlertMessage";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

//validation schema
const validationSchema = Yup.object({
email: Yup.string()
.email("Inavlid Email type")
.required("Email is required"),

username:Yup.string().required("username is required")
});


//component
const UserProfile = () => {

  const dispatch = useDispatch();

  //useQuery 
  const {data ,isLoading , error:profileError ,isFetched} = useQuery({
     queryKey:["get-profile"],
     queryFn:getProfileAPI,
  });


  //useMutation
  const {mutateAsync , isError ,isPending, error , isSuccess } = useMutation({
    mutationKey:["change-profile"],
    mutationFn:updateProfileAPI
  });

  //formik
  const formik = useFormik({
    initialValues: {
      email:"",
      username: "",
    },
    validationSchema,
    //Submit
    onSubmit: (values) => {
      
      mutateAsync(values).then(data=>{
        console.log("jekjek");
        localStorage.removeItem("userInfo"); 
        dispatch(logoutAction());
      }).catch(e=>console.log(error));
    },
  });
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
        {/**display messages for useQuery to get the profile  */}
        {profileError && <AlertMessage type="error" message={profileError?.response?.data?.message}/>}
        
        {isLoading && <AlertMessage type="loading" message="Loading user profile data"/>}

        <h1 className="mb-2 text-2xl text-center font-extrabold">
          Welcome {data?.username}
          <span className="text-gray-500 text-sm ml-2">{data?.email}</span>
        </h1>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Update Profile
        </h3>
         
        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/**display error messages */}
        
      {isError && <AlertMessage type="error" message={error?.response?.data?.message}/>}
      {isSuccess && <AlertMessage type="success" message="User Profile updated"/>}
          {/* User Name Field */}
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                id="username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={data?.username}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <span className="text-xs text-red-500">
                {formik.errors.username}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={data?.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
    </>
  );
};

export default UserProfile;