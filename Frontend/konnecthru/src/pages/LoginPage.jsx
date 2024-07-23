import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Button, TextField } from "@mui/material";
import logo from '../assets/logo_without_text_no_background.png';
import loginImage from '../assets/login-image.webp';  // Ensure the correct path

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(`Failed to login: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden m-0 md:m-4">
        <div className="w-full md:w-1/2 p-8" style={{ marginBottom: '13rem' }}>
          <div className="hidden md:flex items-center justify-center mb-6">
            <img
              src={logo}
              alt="KonnecThru Logo"
              className="h-10"
            />
            <h1 className="ml-4 text-2xl font-bold text-gray-800">
              Konnecthru
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Log in to your Account
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome back! Select method to log in:
          </p>

          <div className="mb-4">
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              className="bg-white"
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              className="bg-white"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600" />
              <label className="ml-2 text-gray-600">Remember me</label>
            </div>
          </div>
          <Button
            onClick={handleLogin}
            variant="contained"
            className="w-full bg-blue-600 text-white py-2"
          >
            Log in
          </Button>
          <p className="text-gray-600 text-center mt-4">
            Dont have an account?{" "}
            <Button variant="text" className="text-blue-600">
              Create an account
            </Button>
          </p>
        </div>
        <div className="hidden md:flex md:w-1/2 bg-firstColor items-center justify-center p-8">
          <div className="text-center text-white">
            <img
              src={loginImage}
              alt="Dashboard Illustration"
              className="h-50 w-60 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">
              Connect with every application.
            </h2>
            <p className="text-sm">Find the Job that matches your profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
