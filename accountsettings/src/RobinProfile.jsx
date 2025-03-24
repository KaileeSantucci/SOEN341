import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import "./RobinProfileV2.css";


const AccountSettings = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                
                
                {/* New Password */}
                <label htmlFor="password">New Password</label>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        name="password" 
                        placeholder="Enter new password" 
                        style={{ paddingRight: "30px" }}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                        }}
                    >
                        {showPassword ? <VscEye /> : <VscEyeClosed />} {/* Needed to disconnect the toggle of the eye icon*/}
                    </span>
                </div>

                {/* Confirm Password */}
                <label htmlFor="confirm-password">Confirm Password</label>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        id="confirm-password" 
                        name="confirm-password" 
                        placeholder="Confirm new password" 
                        style={{ paddingRight: "30px" }}
                    />
                    <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                        }}
                    >
                        {showConfirmPassword ? <VscEye /> : <VscEyeClosed />}
                    </span>
                </div>
                
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AccountSettings;