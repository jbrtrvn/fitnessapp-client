import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Logout() {
  const { unsetUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      unsetUser();
      localStorage.removeItem('token'); // Ensure token is also removed
      navigate('/login');
    };

    handleLogout();
  }, [unsetUser, navigate]);

  return null; // No UI needed for logout
}

export default Logout;
