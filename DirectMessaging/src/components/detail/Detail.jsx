import { auth } from "../../lib/firebase"
import "./detail.css"

const Detail = () => {
    return (
        <div className = 'detail'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>Admin</h2>
                <p>
                    BIO: Hey bros!
                </p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
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
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                src="https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                alt="" 
                                />
                                <span>photo_2024.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                src="https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                alt="" 
                                />
                                <span>photo_2024.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Block User</button>
                <button className="logout" onClick={()=> auth.signOut()}>Logut</button>
            </div>
            
        </div>
    )
}

export default Detail