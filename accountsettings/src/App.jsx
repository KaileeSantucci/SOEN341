import React from 'react';
import './App.css';
import AccountSettings from './RobinProfile'; // This line imports the actual component

function App() {
  return (
    <div className="App">
      <AccountSettings />  {/* 👈 This renders your component */}
    </div>
  );
}

export default App;
