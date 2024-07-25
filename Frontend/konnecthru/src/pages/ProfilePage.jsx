import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Authcontext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #3d52a0;
  margin-bottom: 20px;
`;

const ProfileDetail = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #3d52a0;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
`;

const ResumeDropBox = styled.div`
  border: 2px dashed #3d52a0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  margin-top: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const ResponsiveProfileContainer = styled(ProfileContainer)`
  @media (max-width: 600px) {
    padding: 10px;
    max-width: 100%;
  }
`;

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/users/${currentUser.uid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, [currentUser.uid]);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Resume uploaded:", file);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveProfileContainer>
      <UploadButton>
        Upload Profile Image
        <FileInput type="file" accept="image/*" onChange="" />
      </UploadButton>
      <ProfileTitle>Profile Details</ProfileTitle>
      <ProfileDetail>
        <FontAwesomeIcon icon={faUserFriends} style={{ marginRight: "10px" }} />
        <strong>Name:</strong> {userDetails.name}
      </ProfileDetail>
      <ProfileDetail>
        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: "10px" }} />
        <strong>Email:</strong> {userDetails.email}
      </ProfileDetail>
      <ProfileDetail>
        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: "10px" }} />
        <strong>Date of Birth:</strong> {userDetails.dob}
      </ProfileDetail>
      <ProfileDetail>
        <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: "10px" }} />
        <strong>Phone Number:</strong> {userDetails.phoneNumber}
      </ProfileDetail>
      <ResumeDropBox>
        <label htmlFor="resume-upload">Upload Resume</label>
        <FileInput
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
        />
      </ResumeDropBox>
    </ResponsiveProfileContainer>
  );
};

export default ProfilePage;
