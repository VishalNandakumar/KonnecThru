import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext"; // Ensure this is correctly imported
import { logout } from "../services/authService"; // Import the logout function

function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-fourthColor shadow flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <img
          src="../src/assets/imgs/logo/logo_without_text_no_background.png"
          alt="KonnecThru Logo"
          className="h-10"
        />
        <h1 className="text-3xl font-bold text-gray-900">Konnecthru</h1>
      </div>
      <div className="flex space-x-4 font-bold text-xl">
        <button className="" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="" onClick={() => navigate("/job-listings")}>
          Job Listings
        </button>
        <button className="" onClick={() => navigate("/referral-listings")}>
          Referral Listings
        </button>

        {!currentUser ? (
          <>
            <button className="" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <div className="flex flex-row gap-x-5">
            <button className="" onClick={() => navigate("/post-a-job")}>
              Post a Job
            </button>
            <button className="" onClick={() => navigate("/post-a-referral")}>
              Post a Referral
            </button>
            <button className="" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;
