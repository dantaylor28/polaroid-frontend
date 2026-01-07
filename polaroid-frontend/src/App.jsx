import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { GuestRoute } from "./routes/GuestRoute";
import { Signup } from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Guest Routes */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />
          <Route path="/profile/:username" element={<Profile />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
