// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import axiosInstance from "../../api/axios";
// import toast from "react-hot-toast";

// export const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [signInData, setSignInData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setSignInData({ ...signInData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log("➡️ handleSubmit triggered");
//     setErrors({});

//     try {
//       //   console.log("Submitting login request with data:", signInData);
//       const { data } = await axiosInstance.post(
//         "/dj-rest-auth/login/",
//         signInData
//       );
//       //   console.log("Login Response:", data);
//       //   console.log("Tokens received:", data.access, data.refresh);

//       await login(data.access, data.refresh);

//       //   Redirect user
//       navigate("/");
//       toast.success("Signed in successfully");
//     } catch (error) {
//       console.log("Login Error:", error.response?.data || error.message);
//       setErrors(error.response?.data || { non_field_errors: ["Login Failed"] });
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-red-500">Login Page</h1>
//       <div>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="username"
//             placeholder="username"
//             value={signInData.username}
//             onChange={handleChange}
//             className="border p-2"
//           />
//           {errors.username?.map((msg, idx) => (
//             <p key={idx} className="text-red-500 text-sm">
//               {msg}
//             </p>
//           ))}
//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             value={signInData.password}
//             onChange={handleChange}
//             className="border p-2"
//           />
//           {errors.password?.map((msg, idx) => (
//             <p key={idx} className="text-red-500 text-sm">
//               {msg}
//             </p>
//           ))}
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";
import { AnimatedCircles } from "../../components/AnimatedCircles";
import { Aperture, Lock, User } from "lucide-react";
import { DisplayPasswordBtn } from "../../components/DisplayPasswordBtn";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [sendingData, setSendingData] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendingData) return;
    setSendingData(true);

    try {
      const { data } = await axiosInstance.post(
        "/dj-rest-auth/login/",
        signInData
      );

      await login(data.access, data.refresh);
      navigate("/");
      toast.success("Signed in successfully");
    } catch (error) {
      const data = error.response?.data;

      if (!data) {
        toast.error("Login failed. Please try again.");
        return;
      }

      Object.entries(data).forEach(([field, messages]) => {
        messages.forEach((message) => {
          if (field === "non_field_errors") {
            toast.error(message);
          } else {
            toast.error(`${field}: ${message}`);
          }
        });
      });
    } finally {
      setSendingData(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Login Form */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full text-center items-center justify-center mb-5">
          {/* Logo */}
          <div className="size-14 rounded-xl flex items-center justify-center bg-blue-400/30 mb-4 group hover:bg-blue-400/35">
            <Aperture className="size-7 text-blue-600 group-hover:text-blue-700" />
          </div>
          <h1 className="text-2xl capitalize font-medium text-black tracking-wider mb-1">
            login to your account
          </h1>
          <p className="font-light text-black/60">
            Fill in the form to sign in to your profile
          </p>
        </div>

        {/* Login form */}
        <div>
          <form onSubmit={handleSubmit} className="min-w-[400px]">
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
                  value={signInData.username}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-black/25 rounded-[4px] h-10 pl-10 placeholder:text-black/40 peer focus:outline-none focus:border-black/40"
                />
                <User className="absolute pointer-events-none left-0 ml-2 size-5 text-black/45 peer-focus:text-black/70" />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password">
                <span className="text-xs font-medium">Password</span>
              </label>
              <div className="flex items-center relative">
                <input
                  type={displayPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-black/25 rounded-[4px] h-10 pl-10 placeholder:text-black/40 peer focus:outline-none focus:border-black/40"
                  value={signInData.password}
                  onChange={handleChange}
                />
                <Lock className="absolute pointer-events-none left-0 ml-2 size-5 text-black/45 peer-focus:text-black/70" />
                <DisplayPasswordBtn
                  displayPassword={displayPassword}
                  setDisplayPassword={setDisplayPassword}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                className="flex items-center justify-center text-white w-full h-10 rounded-[4px] cursor-pointer font-medium tracking-wider bg-blue-600/75 hover:bg-blue-600/85 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600/75 transition"
                disabled={sendingData}
              >
                {sendingData ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            <div className="flex items-center justify-center text-xs mt-3 gap-1">
              <p className="font-light text-black/70 ">
                Don't have an account?
              </p>
              <Link
                to={"/signup"}
                className="cursor-pointer text-blue-700/80 hover:text-blue-700 hover:underline transition"
              >
                Sign up here
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Animation */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden bg-black">
        <AnimatedCircles className="w-62 h-62 bg-purple-500/40 top-20 left-20 hover:bg-purple-500/50" />
        <AnimatedCircles className="w-62 h-62 bg-pink-500/30 bottom-70 right-50 hover:bg-pink-500/40" />
        <AnimatedCircles className="w-54 h-54 bg-blue-500/40 top-40 -right-1 hover:bg-blue-500/50" />
        <AnimatedCircles className="w-54 h-54 bg-green-500/30 bottom-50 left-10 hover:bg-green-500/40" />
        <AnimatedCircles className="w-54 h-54 bg-yellow-500/40 bottom-10 right-10 hover:bg-yellow-500/50" />

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
