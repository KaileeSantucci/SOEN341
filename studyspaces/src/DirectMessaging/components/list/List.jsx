import Chatlist from "./chatList/Chatlist"
import "./list.css"
import "../../src/DirectMessagingIndex.css"
import UserInfo from "./userInfo/Userinfo"

const List = () => {
    console.log("List is being rendered!")
    return (
        <div className="directMessagingContainer">
        <div className = 'list'>
            
            <UserInfo/>
            <Chatlist/>

        </div>
        </div>
    )
}
export default List
