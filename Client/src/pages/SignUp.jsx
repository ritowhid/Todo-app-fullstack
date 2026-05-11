import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!username.trim()) return setError("Please enter a username.");
    if (!email.trim()) return setError("Please enter your email.");
    if (!password.trim()) return setError("Please enter a password.");

    try {
      const res = await axios.post("http://localhost:5000/signup", { username, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-600">
      <h2 className="text-white text-4xl font-semibold mb-6 drop-shadow-md">Sign-Up</h2>
      <div className="bg-white/95 rounded-2xl shadow-xl w-85">
        <div className="p-8">
          <h3 className="text-gray-700 font-bold text-lg mb-4">Create Account</h3>

          <label className="text-gray-600 font-semibold text-sm">Username</label>
          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          <label className="text-gray-600 font-semibold text-sm">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          <label className="text-gray-600 font-semibold text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-600 text-sm px-3 py-2 rounded-lg mt-3">
              {error}
            </div>
          )}

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg uppercase tracking-wider hover:scale-[1.02] hover:opacity-90 transition mt-4"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?
            <a href="/login" className="ml-1 text-blue-600 font-semibold hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;