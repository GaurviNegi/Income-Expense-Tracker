import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {useDispatch} from "react-redux"
import { updatePasswordAPI } from "../API/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { logoutAction } from "../../redux/slice/authSlice";

//validation
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 5 characters long")
    .required("Password is required"),
});

//component 
const UpdatePassword = () => {
  //dispatch 
  const dispatch = useDispatch();

  //useMutation
  const { mutateAsync, isError, isLoading, error, isSuccess } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: updatePasswordAPI,
  });
  //formik
  const formik = useFormik({
    initialValues: {
      newPassword: "123456",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);
      mutateAsync(values)
        .then((data) => {
          console.log("hello");
           dispatch(logoutAction());
           localStorage.removeItem("userInfo");
        })
        .catch((e) => console.log(e));
    },
  });
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>

      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        {/* display error messages */}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message} />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Password changed successfully"
          />
        )}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("newPassword")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.newPassword}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
