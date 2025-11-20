import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

export const Signup = () => {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const { data } = await axiosInstance.post(
        "/dj-rest-auth/registration/",
        signUpData
      );

      console.log("signup success:", data);
      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      setErrors(
        error.response?.data || { non_field_errors: ["Signup Failed"] }
      );
    }
  };
  return <div>Signup</div>;
};
