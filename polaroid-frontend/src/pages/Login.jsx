import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  return <div>Login</div>;
};
