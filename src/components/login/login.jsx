import { toast } from "react-toastify";
import "./login.css"

const Login = () => {
    
    const handleLogin = e =>{
        e.preventDefault()
    }

    return(
        <div className="login">
            <div className="item">
                <h2>Welcome Back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="passowrd" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form>
                    <input type="username" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="passowrd" />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;