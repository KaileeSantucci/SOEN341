import { toast } from "react-toastify";
import "./login.css"
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    
    const handleRegister = async e =>{
        e.preventDefault()
        const formData = new FormData(e.target)

        const {username,email,password} = Object.fromEntries(formData);
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)


        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    };

    const handleLogin = e =>{
        e.preventDefault()
    }

    return(
        <div className="login">
            <div className="item">
                <h2>WELCOME BACK!</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="passowrd" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <input type="username" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;