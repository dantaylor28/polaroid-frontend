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
    setErrors({});

    try {
      const { data } = await axiosInstance.post(
        "/dj-rest-auth/login/",
        signInData
      );

      //   expect { access_token, refresh_token, user: {...} }
      login(data.access_token, data.refresh_token, data.user);

      //   Redirect user
      navigate(-1);
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
            value={form.username}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
            className="border p-2"
          />
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
