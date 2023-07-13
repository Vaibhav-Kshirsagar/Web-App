import React, { useContext } from "react";
import profile from "../imges/profile-myChat.jpg" 
import { signOut } from "firebase/auth";
import { auth } from "../Pages/Firebase";
import { AuthContext } from "../Context/AuthContext";
const Navbar=()=>{ 
    const { currentUser } = useContext(AuthContext);
    return(<>
        <div className="navbar">
            <span className="nav-logo">MyChat</span>
            <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    </>)
} 

export default Navbar;