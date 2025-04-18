import React from 'react';
import AccountSettings from './MyAccountSettings'; // This line imports the actual component

const MyAccountApp = () => {
  return (
    <div className="App">
      <AccountSettings />  {/* 👈 This renders your component */}
    </div>
  );
}

export default MyAccountApp;