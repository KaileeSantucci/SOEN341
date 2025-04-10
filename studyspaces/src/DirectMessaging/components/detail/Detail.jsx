import { auth } from "../../lib/firebase"
import { useNavigate } from "react-router-dom"
import "./detail.css"

const Detail = () => {
    const navigate = useNavigate()
    return (
        <div className = 'detail'>
            <div className="user">
                <img src="../../../../public/DirectMessaging/avatar.png" alt="" />
                <h2>Account</h2>
                <p>
                    BIO: N/A
                </p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="../../../../public/DirectMessaging/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="../../../../public/DirectMessaging/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="../../../../public/DirectMessaging/arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="../../../../public/DirectMessaging/arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                src="https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                alt="" 
                                />
                                <span>photo_2024.png</span>
                            </div>
                            <img src="../../../../public/DirectMessaging/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                src="https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                alt="" 
                                />
                                <span>photo_2024.png</span>
                            </div>
                            <img src="../../../../public/DirectMessaging/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                src="https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                alt="" 
                                />
                                <span>photo_2024.png</span>
                            </div>
                            <img src="../../../../public/DirectMessaging/download.png" alt="" className="icon"/>
                        </div>
                        
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="../../../../public/DirectMessaging/arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Block User</button>
                {/* ✅ Back to Home Button */}
                <button onClick={() => navigate("/home")} className="back-home-btn">
                    ⬅ Back to Home
                </button>
            </div>
            
        </div>
    )
console.log("Detail.jsx");
}

export default Detail
