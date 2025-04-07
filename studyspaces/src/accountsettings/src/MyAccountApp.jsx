import React, { useEffect } from 'react';
import { useUserStore } from '../../DirectMessaging/lib/userStore'; // This line imports the actual component
import { Navigate } from 'react-router-dom';
import Login from '../../UserAuthentication/login/Login';
import AccountSettings from './MyAccountSettings'; // This line imports the actual component

const MyAccountApp = () => {
  return (
    <div className="App">
      <AccountSettings />  {/* 👈 This renders your component */}
    </div>
  );
}

export default MyAccountApp;