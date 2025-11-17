import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("➡️ handleSubmit triggered");
    setErrors({});

    try {
    //   console.log("Submitting login request with data:", signInData);
      const { data } = await axiosInstance.post(
        "/dj-rest-auth/login/",
        signInData
      );
    //   console.log("Login Response:", data);
    //   console.log("Tokens received:", data.access, data.refresh);

      await login(data.access, data.refresh);

      //   Redirect user
      navigate("/");
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
      setErrors(error.response?.data || { non_field_errors: ["Login Failed"] });
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={signInData.username}
            onChange={handleChange}
            className="border p-2"
          />
          {errors.username?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
          <input
            type="password"
            name="password"
            placeholder="password"
            value={signInData.password}
            onChange={handleChange}
            className="border p-2"
          />
          {errors.password?.map((msg, idx) => (
            <p key={idx} className="text-red-500 text-sm">
              {msg}
            </p>
          ))}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
