import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../DirectMessaging/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { create } from "zustand";
import "./registrationStyle.css";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ firstName: "", lastName: "", username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false); //loading state for buttons

    useEffect (() => {
      document.body.classList.add("register-page");  
      return () => {
          document.body.classList.remove("register-page");
      }
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //handleRegister function
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

          await setDoc(doc(db, "users", res.user.uid), {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            id: res.user.uid,
            createdAt: new Date(),
            admin: false, //default to false
            blocked: [],
          });

          await setDoc(doc(db, "userchats", res.user.uid), {
            chats:[], //initialize chats array (empty)
          }); 

          toast.success("Account created! You can now log in.");
          navigate("/login");
        } catch (error) {
          console.log("Registration error: ", error);
          toast.error(error.message);
        }finally {
          setLoading(false);
        }
      }

    return (
        <div className="MainBox">
          <div className="parent">
            {/* Logo div */}
            <div className="div10" onClick={() => navigate("/about-us")} style={{ cursor: "pointer" }}>
              <img 
              src="../../../public/DirectMessaging/StudySpace.png" 
              alt="StudySpace Logo" 
              style={{ maxWidth: "100%", height: "auto" }} 
              />
            </div>
    
            {/* Header Message */}
            <div className="div20">
              <h1>
                First time?
                <br />
                Don't be shy!
              </h1>
              <h3>Tell us about yourself...</h3>
            </div>
    
            {/* Registration Form */}
            <div className="div30">
              <form className="registration-form" onSubmit={handleRegister}>
              <input type="username" name="dummy_username" autoComplete="off" style={{ display: 'none' }} />
              <input type="password" name="dummy_password" autoComplete="new-password" style={{ display: 'none' }} />

                <div className="input-group">
                  <input type="text" name="firstName" className="input" id="firstName" required onChange={handleChange} />
                  <label className="user-label" htmlFor="firstName">First Name</label>
                </div>
                <br />
    
                <div className="input-group">
                  <input type="text" name="lastName" className="input" id="lastName" required onChange={handleChange} />
                  <label className="user-label" htmlFor="lastName">Last Name</label>
                </div>
                <br />
    
                <div className="input-group">
                  <input type="text" name="username" autoComplete="off" className="input" id="username" required onChange={handleChange} />
                  <label className="user-label" htmlFor="username">User Name</label>
                </div>
                <br />
    
                <div className="input-group">
                  <input type="email" name="email" className="input" id="email" required onChange={handleChange} />
                  <label className="user-label" htmlFor="email">Email</label>
                </div>
                <br />
    
                <div className="input-group">
                  <input type="password" name="password" className="input" id="password" required onChange={handleChange} />
                  <label className="user-label" htmlFor="password">Password</label>
                </div>
                <br />
    
                <span className="div40">
                  <button type="submit" id="registration-btn" className="signupbtn">Register Now!</button>
                </span>
              </form>
            </div>
    
            {/* Login Link */}
            <div className="div40">
              Already have an account? <a href="/login">Sign in</a>
            </div>
    
            <div className="div5"></div>
          </div>
        </div>
      );

}
export default Register;