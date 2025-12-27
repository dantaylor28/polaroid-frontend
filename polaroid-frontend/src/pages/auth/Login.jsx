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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
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

      await login(data.access, data.refresh);
      navigate("/");
      toast.success("Signed in successfully");
    } catch (error) {
      setErrors(error.response?.data || { non_field_errors: ["Login failed"] });
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">
      {/* Login Form */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-2xl font-semibold mb-6 text-gray-900">
            Welcome back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signInData.username}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.username?.map((msg, i) => (
                <p key={i} className="text-sm text-red-500 mt-1">
                  {msg}
                </p>
              ))}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signInData.password}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.password?.map((msg, i) => (
                <p key={i} className="text-sm text-red-500 mt-1">
                  {msg}
                </p>
              ))}
            </div>

            {errors.non_field_errors?.map((msg, i) => (
              <p key={i} className="text-sm text-red-500">
                {msg}
              </p>
            ))}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Animation */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden bg-black">
        {/* Blob 1 */}
        <div className="absolute animate-float top-20 left-20">
          <div className="blob w-56 h-56 bg-purple-500/40 blur-3xl rounded-full" />
        </div>

        {/* Blob 2 */}
        <div className="absolute animate-float-slow bottom-20 right-20">
          <div className="blob w-56 h-56 bg-pink-500/30 blur-3xl rounded-full" />
        </div>

        {/* Blob 3 */}
        <div className="absolute animate-float-slow top-40 right-20">
          <div className="blob w-48 h-48 bg-blue-500/40 blur-3xl rounded-full" />
        </div>

        {/* Blob 4 */}
        <div className="absolute animate-float bottom-50 left-40">
          <div className="blob w-48 h-48 bg-green-500/30 blur-3xl rounded-full" />
        </div>

        {/* Center Text */}
        <div className="relative text-white text-center px-8">
          <h2 className="text-3xl font-semibold mb-3">Polaroid</h2>
          <p className="text-gray-300">Capture moments. Share stories.</p>
        </div>
      </div>
    </div>
  );
};
