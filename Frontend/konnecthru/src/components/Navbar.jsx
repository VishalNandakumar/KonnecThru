// src/components/NavBar.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
import { logout } from "../services/authService"; 
import styled from 'styled-components';
import logo from '../assets/logo_without_text_no_background.png';  

const NavBarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height: 50px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #3d52a0;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${props => (props.primary ? "#3d52a0" : "#e0e0e0")};
  color: ${props => (props.primary ? "#ffffff" : "#3d52a0")};

  &:hover {
    background-color: ${props => (props.primary ? "#7091e6" : "#d1d1d1")};
  }
`;

function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <NavBarContainer>
      <LogoContainer>
        <Logo src={logo} alt="KonnecThru Logo" />
        <Title>KonnecThru</Title>
      </LogoContainer>
      <NavButtons>
        <Button primary onClick={() => navigate("/")}>
          Home
        </Button>
        <Button onClick={() => navigate("/job-listings")}>
          Job Listings
        </Button>
        <Button onClick={() => navigate("/referral-listings")}>
          Referral Listings
        </Button>

        {!currentUser ? (
          <>
            <Button primary onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button primary onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        ) : (
          <NavButtons>
            <Button onClick={() => navigate("/post-a-job")}>
              Post a Job
            </Button>
            <Button onClick={() => navigate("/post-a-referral")}>
              Post a Referral
            </Button>
            <Button primary onClick={handleLogout}>
              Logout
            </Button>
          </NavButtons>
        )}
      </NavButtons>
    </NavBarContainer>
  );
}

export default NavBar;
