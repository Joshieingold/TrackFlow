// src/GeneralComponents/Logout/logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../GeneralComponents/Database/firebase'; // adjust to your actual path
import { signOut } from 'firebase/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate('/'); // Redirect to login
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
