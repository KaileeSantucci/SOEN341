import { toast } from "react-toastify";
import "./login.css"
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";



const Login = () => {
    const [loading, setLoading] = useState(false);
    
    const handleRegister = async e =>{
        e.preventDefault()
        const formData = new FormData(e.target)

        const {username,email,password} = Object.fromEntries(formData);
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", res.user.uid), {
                username: username,
                email,
                id : res.user.uid,
                blocked: [],
            });
            toast.success("Account created! You can now log in!")
            
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });

        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    };

    const handleLogin = async(e) =>{
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target)

        const {email,password} = Object.fromEntries(formData);

        try{
            await signInWithEmailAndPassword(auth,email,password);

        }catch (err){
            console.log(err);
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className="login">
            <div className="item">
                <h2>WELCOME BACK!</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
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