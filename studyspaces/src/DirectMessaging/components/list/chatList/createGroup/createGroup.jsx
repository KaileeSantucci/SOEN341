import "./createGroup.css"
import { toast } from "react-toastify";
import { useState } from "react";
import { db } from "../../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";


const CreateGroup = () => {
        const handleRegister = async e =>{
            e.preventDefault()
            const formData = new FormData(e.target)
    
            const {chatUsername} = Object.fromEntries(formData);
            
            try{
                const res = await createUserWithEmailAndPassword(auth, chatUsername);
    
                await setDoc(doc(db, "chats", res.user.uid), {
                    chatUsername: chatUsername,
                    id : res.user.uid,
                    blocked: [],
                });
                toast.success("Account created! You can now log in!")
                
                await setDoc(doc(db, "userchats", res.user.uid), {
                    chats: [],
                });
    
            }catch(err){
                console.log(err)
                toast.error(err.message)
            }
        };
    return(
        <div className="item">
            <h4>Create a Group Chat</h4>
            <form onSubmit={handleRegister}>
                <input type="chatname" placeholder="ChatName" name="chatname" />
                <button>Create</button>
            </form>
        </div>
    );
};


export default CreateGroup;