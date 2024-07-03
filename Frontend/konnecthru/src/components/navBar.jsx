// src/components/NavBar.jsx
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"; // Ensure this is correctly imported
import { logout } from "../services/authService"; // Import the logout function

const useStyles = makeStyles({
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  },
  logo: {
    height: "50px",
  },
  navButtons: {
    display: "flex",
    gap: "20px",
  },
  button: {
    color: "#3d52a0",
    backgroundColor: "#f5f6f7",
    "&:hover": {
      backgroundColor: "#7091e6",
      color: "#f5f6f7",
    },
  },
});

function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Use the current user from context

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Optionally navigate the user to the homepage or login page
  };

  return (
    <nav className={classes.navBar}>
      <img
        src="../src/assets/imgs/logo/logo_without_text_no_background.png"
        alt="KonnecThru Logo"
        className={classes.logo}
      />
      <div className={classes.navButtons}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button className={classes.button} variant="contained" onClick={() => navigate('/job-listings')}>
          Job Listings
        </Button>
        <Button className={classes.button} variant="contained" onClick={() => navigate('/post-a-job')}>
          Post a Job
        </Button>
        <Button className={classes.button} variant="contained" onClick={() => navigate('/referrals')}>
          Referrals
        </Button>
        <Button className={classes.button} variant="contained" onClick={() => navigate('/events')}>
          Events
        </Button>
        <Button className={classes.button} variant="contained" onClick={() => navigate('/contact-us')}>
          Contact Us
        </Button>
        {!currentUser ? (
          <>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
