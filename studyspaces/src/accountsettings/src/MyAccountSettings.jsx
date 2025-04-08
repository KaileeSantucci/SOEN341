import React, { useState, useEffect } from "react";
import { useUserStore } from "../../DirectMessaging/lib/userStore"; // This line imports the actual component
import { auth } from "../../DirectMessaging/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import "./MyAccount.css"; // Import your CSS file

const AccountSettings = () => {
    const { fetchUserInfo } = useUserStore();
    const currentUser = useUserStore((state) => state.currentUser);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const[ FormData, setFormData] = useState({
        admin: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await fetchUserInfo(user.uid);
            }
        });
        return () => unSub();
    }, [fetchUserInfo]);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                admin: currentUser.admin || false,
                username: currentUser.username || "",
                firstName: currentUser.firstName || "",
                lastName: currentUser.lastName || "",
                email: currentUser.email || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [currentUser]);


    return (
        <div className="SettingsContainer">        
            <h2 style={{fontSize:"45px"}}>Account Settings</h2>
            <p><currentUser className="id"></currentUser></p>
            <form className="SettingsForm">
                <div className='formGroup'>
                    <div className='userId'>
                    <div className='userType'>
                        <label htmlFor="isadmin">User Type: </label>
                        <input
                            type="text"
                            id="isadmin"
                            name="isadmin"
                            value={FormData.admin ? "Admin" : "Basic User"}
                        />
                    </div>
                </div>

                <div className="formGroup">
                    <div className='profilePic'>
                        <label htmlFor="profile-pic">Profile Picture: </label> {/* Will not be storing this anymore in the backend but will be adding this in future iterations */}
                        <input type="file" id="profile-pic" name="profile-pic" accept="image/*" />
                    </div>
                </div>

                <div className="formGroup">
                    <div className='userNameSettings'>
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={FormData.username}
                        />{/*Should be populated from backend */}
                    </div>
                </div>

                <div className="formGroup">
                    <div className='firstNameSettings'>
                        <label htmlFor="firstname">First Name: </label>{/*Should be populated from backend */}
                        <input 
                            type="text" 
                            id="firstname" 
                            name="firstName" 
                            value={FormData.firstName} 
                            onChange={(e) => setFormData({ ...FormData, firstName: e.target.value })}
                            placeholder="First name" 
                        />{/*Should be populated from backend */}
                    </div>
                </div>
                
                <div className="formGroup">
                    <div className='lastNameSettings'>
                        <label htmlFor="lastname">Last Name: </label>
                        <input
                            type="text" 
                            id="lastname" 
                            name="lastName" 
                            value={FormData.lastName} 
                            onChange={(e) => setFormData({ ...FormData, lastName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="formGroup">
                    <div className='emailSettings'>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={FormData.email} 
                            />{/*Should be populated from backend */}
                    </div> 
                </div>

                <br />
                </div>
                {/* To enter a new password */}
                {
                /* 
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
                        {showPassword ? <VscEye /> : <VscEyeClosed />} 
                    </span>
                </div>

                
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
                */}
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AccountSettings;