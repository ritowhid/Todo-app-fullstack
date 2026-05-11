import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        {/* Default page */}
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={!token ? <SignUp /> : <Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;