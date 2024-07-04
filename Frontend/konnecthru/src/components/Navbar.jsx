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
    backgroundColor: "#kd351j",
    "&:hover": {
      backgroundColor: "#7091e6",
      color: "#f5f6f7",
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
    <header className="bg-white shadow flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <img
          src="../src/assets/imgs/logo/logo_without_text_no_background.png"
          alt="KonnecThru Logo"
          className="h-10"
        />
        <h1 className="text-3xl font-bold text-gray-900">Konnecthru</h1>
      </div>
      <div className="flex space-x-4">
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded"
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
              className="bg-blue-500 text-white py-2 px-4 rounded"
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              variant="contained"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        ) : (
          <div className="flex flex-row gap-x-5">
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
              className="bg-blue-500 text-white py-2 px-4 rounded"
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
