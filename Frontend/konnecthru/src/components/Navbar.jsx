import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
import { logout } from "../services/authService";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo_without_text_no_background.png";
import profilePic from "../assets/pic.webp"; // Ensure this path is correct

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

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: #ffffff;
    position: absolute;
    top: 70px;
    right: 0;
    width: 200px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.open ? "flex" : "none")};
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(props) => (props.primary ? "#3d52a0" : "#e0e0e0")};
  color: ${(props) => (props.primary ? "#ffffff" : "#3d52a0")};

  &:hover {
    background-color: ${(props) => (props.primary ? "#7091e6" : "#d1d1d1")};
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const DropdownItem = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 16px;
  color: #3d52a0;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserType = async () => {
      if (currentUser) {
        try {
          const API_URL = import.meta.env.VITE_API_URL;

          const response = await fetch(
            `${API_URL}/api/users/${currentUser.uid}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUserType(data.userType);
        } catch (error) {
          console.error("Failed to fetch user type:", error);
        }
      }
    };

    fetchUserType();
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavBarContainer>
      <LogoContainer>
        <Logo src={logo} alt="KonnecThru Logo" />
        <Title>KonnecThru</Title>
      </LogoContainer>
      <HamburgerButton onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </HamburgerButton>
      <NavButtons open={isOpen}>
        <Button primary onClick={() => navigate("/")}>
          Home
        </Button>
        <Button onClick={() => navigate("/job-listings")}>Job Listings</Button>
        {currentUser ? (
          <>
            <Button primary onClick={() => navigate("/post-a-job")}>
              Post a Job
            </Button>
            <ProfileContainer ref={dropdownRef}>
              <ProfilePic
                src={profilePic}
                alt="Profile"
                onClick={toggleDropdown}
              />
              <DropdownMenu show={dropdownOpen}>
                <DropdownItem onClick={() => navigate("/profile")}>
                  View Profile
                </DropdownItem>
                {userType === "admin" && (
                  <DropdownItem onClick={() => navigate("/admin")}>
                    Admin Dashboard
                  </DropdownItem>
                )}
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </ProfileContainer>
          </>
        ) : (
          <>
            <Button primary onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </>
        )}
      </NavButtons>
    </NavBarContainer>
  );
}

export default NavBar;
