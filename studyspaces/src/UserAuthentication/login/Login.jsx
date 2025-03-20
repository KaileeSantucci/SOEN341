import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../DirectMessaging/lib/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuthentication } from "../userauthentication.js";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import "./loginStyle.css";


const Login = () => {
    const navigate = useNavigate();
    const { user } = useAuthentication(); //Get user authentication state 
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        document.body.classList.add("login-page");
    //if user is already logged in then redirect them to the home page
    if(user){
        navigate("/home"); 
    }
    return () => {
        document.body.classList.remove("login-page");
    }
});

    const handleChange = (e) => {   //handles input changes
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User signed in successfully.");
            navigate("/home"); // Redirect to home page
        } catch (error) {
            alert("Error signing in"+error.message);
        }finally{setLoading(false);}
    };


return (
    <div className="MainBox">
        <div className="parent">
            <div className="div1"> 
                <h1>Welcome Back!</h1>
                <p style={{ fontFamily: "Habibi" }}>(we missed you)</p>
            </div>

            <div className="div2"> 
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
                        <label className="user-label">Email</label>
                    </div>
                    <div className="input-group">
                        <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
                        <label className="user-label">Password</label>
                    </div> <br />
                    <span>
                        <button type="submit" id="loginBtn" className="loginbtn" disabled={loading}>
                            {loading ? "Logging in..." : "Sign In"}
                        </button>
                    </span>
                </form>
            </div>

            <div className="div3"> 
                <img src="../studyspaces/public/DirectMessaging/StudySpace.png" alt="StudySpace Logo" style={{maxWidth: "100%", height: "auto"}}/>
            </div>

            <div className="div4"> 
                <h1>First time?</h1><br />
                <button className="registration-btn" onClick={ () => navigate("/register")} >Register Now</button>
            </div>
        </div>
    </div>  
);

};

export default Login;
