// src/services/authService.js
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Simulated function to send data to a backend API
const saveUserDetailsToBackend = async (userId, userDetails) => {
    try {
        const response = await fetch('https://konnecthru.onrender.com/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, ...userDetails })
        });
        if (!response.ok) {
            throw new Error('Failed to save user details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error saving user details:', error);
        throw error;
    }
};

// Registration function with backend API for MongoDB
export const register = async (email, password, name, dob, phoneNumber, userType = 'user') => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Send user details to the backend to be saved in MongoDB
        await saveUserDetailsToBackend(user.uid, { email, name, dob, phoneNumber, userType });
        return user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

// Login function
export const login = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Logout function
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};
