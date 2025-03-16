import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import "./index.css"

import { onAuthStateChanged } from "firebase/auth";


const App = () => {
    const user = false;

    useEffect(()=>{
      const unSub = onAuthStateChanged(auth,(user)=>{
        console.log(user);
      });
      
      return () => {
        unSub();
      };
    },[]);

  return (
    <div className='container'>
      {user ? (
        <>
          <List/>
          <Chat/>
          <Detail/>
        </>
      ) : (
        <Login/>
      )}

    </div>
  )
}

export default App