import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Tailwind CSS classes and custom styles
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
    gap: "15px",
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

  return (
    <nav className={classes.navBar}>
      <img
        src="../src/assets/imgs/logo/logo_without_text_no_background.png"
        alt="KonnecThru Logo"
        className={classes.logo}
      />
      <div className={classes.navButtons}>
        <Button className={classes.button} variant="contained">
          Home
        </Button>
        <Button className={classes.button} variant="contained">
          Login
        </Button>
        <Button className={classes.button} variant="contained">
          Register
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
