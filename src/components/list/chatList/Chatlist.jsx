import "./chatList.css"

const Chatlist = () => {
    const [addMode,setAddMode] = useState(false)

    return (
        <div className = 'chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt=""/>
                    <input type="text" placeholder="Search"/>
                </div>
                <img src="./plus.png" alt="" className="add"/>
            </div>

        </div>
    )
}

export default Chatlist