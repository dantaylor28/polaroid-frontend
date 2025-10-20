import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <form onSubmit={() => {}} className="flex flex-col gap-3">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={() => {}}
            className="border p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={() => {}}
            className="border p-2"
          />
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
