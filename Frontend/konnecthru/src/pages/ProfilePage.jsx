import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/Authcontext';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, [currentUser.uid]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileTitle>Profile Details</ProfileTitle>
      <ProfileDetail><strong>Name:</strong> {userDetails.name}</ProfileDetail>
      <ProfileDetail><strong>Email:</strong> {userDetails.email}</ProfileDetail>
      <ProfileDetail><strong>Date of Birth:</strong> {userDetails.dob}</ProfileDetail>
      <ProfileDetail><strong>Phone Number:</strong> {userDetails.phoneNumber}</ProfileDetail>
    </ProfileContainer>
  );
};

export default ProfilePage;
