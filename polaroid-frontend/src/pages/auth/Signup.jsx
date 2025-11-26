import { useState } from "react";
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
  return (
    <div>
      <h1 className="text-red-500">Create Account</h1>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={signUpData.username}
            onChange={handleChange}
            className="border p-2"
          />
          {errors.username?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
          <input
            type="email"
            name="email"
            placeholder="email address"
            value={signUpData.email}
            onChange={handleChange}
            className="border p-2"
          />
          {errors.email?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
          <input
            type="password"
            name="password1"
            placeholder="password"
            value={signUpData.password1}
            onChange={handleChange}
            className="border p-2"
          />
          {errors.password1?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
          <input
            type="password"
            name="password2"
            placeholder="confirm password"
            value={signUpData.password2}
            onChange={handleChange}
            className="border p-2"
          />
          {errors.password2?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
          {errors.non_field_errors?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};
