import React from "react";
import "./RobinProfileV2.css";

const AccountSettings = () => {
    return (
        <div className="container">
            <h2>Account Settings</h2>
            <form>
                <label htmlFor="usertype">Type of User: <strong>Admin</strong></label>
                
                <label htmlFor="profile-pic">Profile Picture</label>
                <input type="file" id="profile-pic" name="profile-pic" accept="image/*" />
                
                <label htmlFor="Username">Username: <strong>Robin123</strong></label>
                
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" name="firstname" placeholder="First name" required />
                
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" placeholder="Last name" required />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="email" required />
                
                
                <label htmlFor="password">New Password</label>
                <input type="password" id="password" name="password" placeholder="Enter new password" />
                
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm new password" />
                
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AccountSettings;