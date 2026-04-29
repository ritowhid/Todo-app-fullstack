import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignIn = () => {
  // --- State Management ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- Auth Handler ---
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      alert("Login success");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-500">
      
      {/* Title */}
      <h2 className="text-white text-4xl font-semibold mb-6 drop-shadow-md">
        Welcome Back
      </h2>

      {/* Card */}
      <div className="bg-white/95 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-[320px]">
        <div className="p-8">
          <h3 className="text-gray-700 font-bold text-lg mb-4 uppercase">
            Sign In
          </h3>

          {/* Email Input */}
          <label className="text-gray-600 font-semibold text-sm">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Password Input */}
          <label className="text-gray-600 font-semibold text-sm">Password</label>
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Sign In Button */}
          <button 
            onClick={handleLogin}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-500 text-white font-bold py-3 rounded-lg uppercase tracking-wider hover:scale-[1.02] hover:opacity-90 transition"
          >
            Sign In
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-indigo-600 font-semibold hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don't have an account?
            <a
              href="SignUp.html"
              className="ml-1 text-indigo-600 font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default SignIn;