import React from "react";
import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";

const Home=()=>{
    return(<>
        <div className="home">
          <div className="home-container">
            <Sidebar/>
            <Chat/>
          </div>
        </div>
    </>)
} 

export default Home;