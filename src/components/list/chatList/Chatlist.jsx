import "./chatList.css"
import { useState } from "react";

const Chatlist = () => {
    const [addMode,setAddMode] = useState(false);

    return (
        <div className = 'chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt=""/>
                    <input type="text" placeholder="Search"/>
                </div>
                <img
                src={addMode ? "./minus.png" : "./plus.png"} 
                alt="" 
                className="add"
                onClick={()=>setAddMode((prev)=>!prev)}
                />
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Big Cheese</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Big Cheese2</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Big Cheese3</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Big Cheese4</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Big Cheese5</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Real Big Cheese</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Big Cheese6</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chatlist