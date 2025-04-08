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
                    <h1 style={{fontSize:"90px", fontFamily:"Bungee Shade"}}>Welcome Back!</h1>
                    <p>(we missed you)</p>
                </div>

                <div className="div2">
                
                <style>
                    {`
                    .input-group {
                        position: relative;
                    }
                    .input {
                        width: 400px;
                        border: solid 1.5px #ffffff ;
                        border-radius: 1rem ;
                        background: none ;
                        padding: 1rem ;
                        font-size: 1rem ;
                        transition: border 150ms cubic-bezier(0.4,0,0.2,1) ;
                    }
                    .user-label {
                        position: absolute;
                        left: 15px;
                        color: #ffe4f0;
                        pointer-events: none;
                        transform: translateY(1rem);
                        transition: 150ms cubic-bezier(0.4,0,0.2,1);
                    }
                    .input:focus, input:valid {
                        outline: none;
                        border: 1.5px solid #000000;
                        background-color: #ffdae8;
                    }
                    .input:focus ~ label, input:valid ~ label {
                        transform: translateY(-50%) scale(0.8);
                        background-color: #000000;
                        border-radius: 15px;
                        padding: 0 .5em;
                        color: #ffffff;
                    }
                    `}
                </style>

                <form className="login-form" onSubmit={handleLogin} autoComplete="off">
                <input type="text" name="dummy_email" autoComplete="off" style={{ display: 'none' }} />
                <input type="password" name="dummy_password" autoComplete="new-password" style={{ display: 'none' }} />

                    <div className="input-group">
                        <input
                            className="input"
                            type="email" 
                            name="email" 
                            autoComplete="off" 
                            required onChange={handleChange} 
                            value={formData.email} 
                         />
                        <label htmlFor="email" className="user-label">Email</label>
                    </div> <br />

                    <div className="input-group">
                        <input 
                            className="input"
                            type="password" 
                            name="password" 
                            autoComplete="off"
                            required onChange={handleChange} 
                            value={formData.password} 
                        />
                        <label htmlFor="password" className="user-label">Password</label>
                    </div> <br />

                    <span>
                        <button type="submit" id="loginBtn" className="loginbtn" disabled={loading}>
                            {loading ? "Logging in..." : "Sign In"}
                        </button>
                    </span>

                </form>
            </div>

            <div className="div3"> 
                <img src="../../../public/DirectMessaging/StudySpace.png" alt="StudySpace Logo" style={{maxWidth: "100%", height: "auto"}}/>
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
