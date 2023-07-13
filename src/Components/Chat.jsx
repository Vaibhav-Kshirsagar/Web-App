import React from "react";
import add from "../imges/add.png";
import cam from "../imges/cam.png";
import more from "../imges/more.png";
import Messages from "./Messages";
import Input from "./Input" 
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
const Chat=()=>{
    const { data } = useContext(ChatContext);
    return(<>
        <div className="chat">
            <div className="chat-info">
                <span>{data.user?.displayName}</span>
                <div className="chat-icons">
                    <img src={cam} alt="" />
                    <img src={add} alt="" />
                    <img src={more} alt="" />
                </div>
            </div>
            <Messages/>
            <Input/>
        </div> 
        
    </>)
} 

export default Chat;