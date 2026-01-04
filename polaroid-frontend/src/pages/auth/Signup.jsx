import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { AnimatedCircles } from "../../components/AnimatedCircles";
import { Aperture, Lock, Mail, ShieldCheck, User } from "lucide-react";
import {
  DisplayConfirmPasswordBtn,
  DisplayPasswordBtn,
} from "../../components/DisplayPasswordBtn";

export const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
  });
  const [sendingData, setSendingData] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendingData) return;

    // Client-side validation
    if (
      !signUpData.username ||
      !signUpData.email ||
      !signUpData.password1 ||
      !signUpData.password2
    ) {
      toast.error("Please fill in all fields");
      setSendingData(false);
      return;
    }

    setSendingData(true);

    try {
      const { data } = await axiosInstance.post(
        "/dj-rest-auth/registration/",
        signUpData
      );

      // console.log("signup success:", data);
      // console.log("access token:", data.access);
      // console.log("refresh token:", data.refresh);

      await login(data.access, data.refresh);
      // Store user info in local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user_id,
          username: data.username,
          email: data.email,
        })
      );

      navigate("/");
      toast.success("Account created successfully");
    } catch (error) {
      const data = error.response?.data;

      if (!data) {
        toast.error("Signup failed. Please try again.");
        return;
      }

      const fieldLabels = {
        username: "Username",
        email: "Email",
        password1: "Password",
        password2: "Confirm password",
        non_field_errors: null,
      };

      const messages = [];

      Object.entries(data).forEach(([field, errors]) => {
        errors.forEach((errorMsg) => {
          if (field === "non_field_errors") {
            messages.push(errorMsg);
          } else {
            const label = fieldLabels[field] || field;
            messages.push(`${label}: ${errorMsg}`);
          }
        });
      });

      if (messages.length === 1) {
        toast.error(messages[0]);
      } else {
        toast.error(
          <div>
            <p className="font-semibold mb-1">Signup failed</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              {messages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>,
          { duration: 6000 }
        );
      }
    } finally {
      setSendingData(false);
    }
  };
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full text-center items-center justify-center mb-5">
          {/* Logo */}
          <div className="size-14 rounded-xl flex items-center justify-center bg-blue-400/30 mb-4 group hover:bg-blue-400/35">
            <Aperture className="size-7 text-blue-600 group-hover:text-blue-700" />
          </div>
          <h1 className="text-2xl capitalize font-medium text-black tracking-wider mb-1">
            create an account
          </h1>
          <p className="font-light text-black/60">
            Fill in the form to create your free profile
          </p>
        </div>

        {/* Signup form */}
        <div>
          <form onSubmit={handleSubmit} className="min-w-100">
            {/* Username Input */}
            <div className="mb-3">
              <label htmlFor="username">
                <span className="text-xs font-medium ">Username</span>
              </label>
              <div className="flex items-center relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  value={signUpData.username}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-black/25 rounded-sm h-10 pl-10 placeholder:text-black/40 peer focus:outline-none focus:border-black/40"
                />
                <User className="absolute pointer-events-none left-0 ml-2 size-5 text-black/45 peer-focus:text-black/70" />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email">
                <span className="text-xs font-medium ">Email</span>
              </label>
              <div className="flex items-center relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={signUpData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-black/25 rounded-sm h-10 pl-10 placeholder:text-black/40 peer focus:outline-none focus:border-black/40"
                />
                <Mail className="absolute pointer-events-none left-0 ml-2 size-5 text-black/45 peer-focus:text-black/70" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password1">
                <span className="text-xs font-medium">Password</span>
              </label>
              <div className="flex items-center relative">
                <input
                  type={displayPassword ? "text" : "password"}
                  id="password1"
                  name="password1"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-black/25 rounded-sm h-10 pl-10 placeholder:text-black/40 peer focus:outline-none focus:border-black/40"
                  value={signUpData.password1}
                  onChange={handleChange}
                />
                <Lock className="absolute pointer-events-none left-0 ml-2 size-5 text-black/45 peer-focus:text-black/70" />
                <DisplayPasswordBtn
                  displayPassword={displayPassword}
                  setDisplayPassword={setDisplayPassword}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-3">
              <label htmlFor="password2">
                <span className="text-xs font-medium">Confirm Password</span>
              </label>
              <div className="flex items-center relative">
                <input
                  type={displayConfirmPassword ? "text" : "password"}
                  id="password2"
                  name="password2"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-black/25 rounded-sm h-10 pl-10 placeholder:text-black/40 peer focus:outline-none focus:border-black/40"
                  value={signUpData.password2}
                  onChange={handleChange}
                />
                <ShieldCheck className="absolute pointer-events-none left-0 ml-2 size-5 text-black/45 peer-focus:text-black/70" />
                <DisplayConfirmPasswordBtn
                  displayConfirmPassword={displayConfirmPassword}
                  setDisplayConfirmPassword={setDisplayConfirmPassword}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                className="flex items-center justify-center text-white w-full h-10 rounded-sm cursor-pointer font-medium tracking-wider bg-blue-600/75 hover:bg-blue-600/85 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600/75 transition"
                disabled={sendingData}
              >
                {sendingData ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="flex items-center justify-center text-xs mt-3 gap-1">
              <p className="font-light text-black/70 ">
                Already have an account?
              </p>
              <Link
                to={"/login"}
                className="cursor-pointer text-blue-700/80 hover:text-blue-700 hover:underline transition"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Animation */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden bg-black">
        <AnimatedCircles className="w-64 h-64 bg-indigo-500/35 top-16 left-16 hover:bg-indigo-500/45" />
        <AnimatedCircles className="w-56 h-56 bg-cyan-400/30 top-28 right-24 hover:bg-cyan-400/40" />
        <AnimatedCircles className="w-72 h-72 bg-purple-500/30 top-1/2 -translate-y-1/2 right-10 hover:bg-purple-500/40" />
        <AnimatedCircles className="w-60 h-60 bg-rose-400/30 bottom-24 left-20 hover:bg-rose-400/40" />
        <AnimatedCircles className="w-52 h-52 bg-amber-400/35 bottom-12 right-16 hover:bg-amber-400/45" />

        {/* Center Text */}
        <div className="relative text-white text-center px-8 pointer-events-none">
          <h2 className="text-3xl font-semibold mb-3">Polaroid</h2>
          <p className="text-gray-300 font-light">
            Capture moments. Share stories.
          </p>
        </div>
      </div>
    </div>
  );
};
