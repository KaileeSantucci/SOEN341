import "./login.css"

const Login = () => {
    file:null;
    url:"";

    return(
        <div className="login">
            <div className="item">
                <h2>Welcome Back,</h2>
                <form>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="passowrd" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <label htmlFor="file">
                    
                </label>
                <input type="username" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="passowrd" />
                <button>Sign In</button>
            </div>
        </div>
    );
};

export default Login;