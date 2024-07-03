import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { Button, TextField, CircularProgress } from "@mui/material";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await register(email, password, name, dob, phoneNumber);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      alert(`Failed to register: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = "Name is required.";
    if (!email) tempErrors.email = "Email is required.";
    if (!dob) tempErrors.dob = "Date of birth is required.";
    if (!phoneNumber) tempErrors.phoneNumber = "Phone number is required.";
    if (!password) tempErrors.password = "Password is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <div>
      <h2>Register</h2>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        type="date"
        label="Date of Birth"
        value={dob}
        onChange={e => setDob(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={!!errors.dob}
        helperText={errors.dob}
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        onClick={handleRegister}
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Register"}
      </Button>
    </div>
  );
}

export default RegisterPage;
