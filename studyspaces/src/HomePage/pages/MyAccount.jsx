import React, { useEffect } from 'react';
import '../src/HomeApp.css';

const MyAccount = () => {
  useEffect(() => {
    window.location.href = '/accountsettings/index.html';
  }, [navigate]);

  return null;
};

export default MyAccount;
