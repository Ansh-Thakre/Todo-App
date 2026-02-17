import { useState } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  // Using React Router navigation instead of window.location
  // keeps routing inside SPA without full reload

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Controlled inputs ensure React is the single source of truth

  const handleSignup = async () => {
    if (!email.trim() || !password.trim()) {
      return toast.error("Email and password are required");
    }
    // Basic client-side validation before hitting Firebase

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      // Await ensures account creation completes before proceeding

      toast.success("Account created!");
      navigate("/todos");
      // Redirect after successful signup improves UX consistency
    } catch (error) {
      toast.error(
        "Failed to create account. Please check your email and password!",
      );
      console.error(error);
      // Logging error helps debugging without exposing internal details to user
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return toast.error("Email and password are required");
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);

      toast.success("Login successful!");
      navigate("/todos");
      // Navigation handled only after successful authentication
    } catch (error) {
      toast.error("Invalid email or password!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-4 w-96">
        <h2 className="text-2xl text-gray-200 text-center">Ansh Todo App</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-700 text-gray-200 rounded"
          // Removed invalid 'validate' attribute
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-700 text-gray-200 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 p-2 rounded hover:bg-purple-700 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
