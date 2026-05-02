import React, { useState } from "react";

const SignUp = () => {
  // --- State Management ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Added for the username field

  // --- Auth Handler (Firebase removed) ---
  const handleSignup = async () => {
    try {
      alert("Signup success");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-600">

      {/* Title */}
      <h2 className="text-white text-4xl font-semibold mb-6 drop-shadow-md">
        Sign-Up
      </h2>

      {/* Card */}
      <div className="bg-white/95 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-85">
        <div className="p-8">
          <h3 className="text-gray-700 font-bold text-lg mb-4">
            Create Account
          </h3>

          {/* Username */}
          <label className="text-gray-600 font-semibold text-sm">Username</label>
          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Email */}
          <label className="text-gray-600 font-semibold text-sm">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Password */}
          <label className="text-gray-600 font-semibold text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Confirm Password */}
          <label className="text-gray-600 font-semibold text-sm">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Button */}
          <button 
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg uppercase tracking-wider hover:scale-[1.02] hover:opacity-90 transition"
          >
            Sign Up
          </button>

          {/* Signin text */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?
            <a
              href="SignIn.html"
              className="ml-1 text-blue-600 font-semibold hover:underline"
            >
              Log In
            </a>
          </p>

        </div>
      </div>

    </div>
  );
};

export default SignUp;