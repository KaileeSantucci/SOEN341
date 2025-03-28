import "./userInfo.css"
import {useUserStore} from "../../../lib/userStore"

const UserInfo = () => {

    const {currentUser, isLoading} = useUserStore();
    
    if(isLoading) return <p>Loading...</p>
    if(!currentUser) return <p>Error: No user found.</p>

    return (
        <div className = 'userInfo'>
            <div className="user">
                <img src={currentUser.avatar || "../../../../public/DirectMessaging/avatar.png"} alt=""/>
                <h2>{currentUser?.username || "Unknown User"}</h2>
            </div>
            <div className="icons">
                <img src="../../../../public/DirectMessaging/more.png" alt=""/>
                <img src="../../../../public/DirectMessaging/video.png" alt=""/>
                <img src="../../../../public/DirectMessaging/edit.png" alt=""/>
            </div>
        </div>
    )
console.log("UserInfo is being rendered!")
}

export default UserInfo