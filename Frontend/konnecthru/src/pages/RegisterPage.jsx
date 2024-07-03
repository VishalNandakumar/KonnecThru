import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { Button, TextField } from "@mui/material";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(email, password);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      alert(`Failed to register: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleRegister} variant="contained">Register</Button>
    </div>
  );
}

export default RegisterPage;
