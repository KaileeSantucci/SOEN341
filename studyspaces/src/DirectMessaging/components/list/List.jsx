import Chatlist from "./chatList/Chatlist"
import "./list.css"
import UserInfo from "./userInfo/Userinfo"

const List = () => {
    console.log("List is being rendered!")
    return (
        <div className = 'list'>
            
            <UserInfo/>
            <Chatlist/>


        </div>
    )
}

export default List
console.log("List is being rendered!")