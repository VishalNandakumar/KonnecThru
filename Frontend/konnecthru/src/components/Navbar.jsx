// src/components/NavBar.jsx
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
import { logout } from "../services/authService"; 
import logo from '../assets/logo_without_text_no_background.png';  

const useStyles = makeStyles({
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    height: "50px",
  },
  navButtons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#3d52a0",
    "&:hover": {
      backgroundColor: "#7091e6",
    },
  },
  primaryButton: {
    color: "#ffffff",
    backgroundColor: "#3d52a0",
    "&:hover": {
      backgroundColor: "#7091e6",
    },
  },
});

function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className={classes.navBar}>
      <div className={classes.logoContainer}>
        <img
          src={logo}
          alt="KonnecThru Logo"
          className={classes.logo}
        />
        <h1 className="text-3xl font-bold text-gray-900">Konnecthru</h1>
      </div>
      <div className={classes.navButtons}>
        <Button
          className={classes.primaryButton}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => navigate("/job-listings")}
        >
          Job Listings
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => navigate("/referral-listings")}
        >
          Referral Listings
        </Button>

        {!currentUser ? (
          <>
            <Button
              className={classes.primaryButton}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className={classes.primaryButton}
              variant="contained"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        ) : (
          <div className={classes.navButtons}>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => navigate("/post-a-job")}
            >
              Post a Job
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => navigate("/post-a-referral")}
            >
              Post a Referral
            </Button>
            <Button
              className={classes.primaryButton}
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;
