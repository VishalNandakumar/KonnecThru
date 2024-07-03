// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Button, TextField } from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert(`Failed to login: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} variant="contained">Login</Button>
    </div>
  );
}

export default LoginPage;
