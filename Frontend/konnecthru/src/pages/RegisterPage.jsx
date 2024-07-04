import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { Button, TextField, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f6f7',
  },
  paper: {
    padding: '32px',
    maxWidth: 500,
    width: '100%',
    margin: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  button: {
    marginTop: '16px',
  },
  title: {
    marginBottom: '16px',
    textAlign: 'center',
  },
});

function RegisterPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await register(email, password, name, dob, phoneNumber);
      alert("Registration successful!");
      navigate("/");
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
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" className={classes.title}>
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            type="date"
            label="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob}
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            className={classes.button}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
