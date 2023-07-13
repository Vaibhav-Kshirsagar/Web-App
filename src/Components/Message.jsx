import React from "react";
import { useContext,useRef,useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
const Message=(message)=>{
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
  
    const ref = useRef();
  
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
      <>
        <div
          ref={ref}
          className={`message${
            message.message.senderId === currentUser.uid ? "-owner" : ""
          }`}
        >
          <div className="message-info">
            <img
              src={
                message.message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL 
              }
              alt=""
            />
            <span>just now</span>
          </div>
          <div className="message-content">
          {message.message.img && message.message.text && (
          <div style={{ display: "flex",flexDirection:"column"}}>
            <img
              src={message.message.img}
              alt=""
              style={{ maxWidth: "100%", maxHeight: "200px" , paddingBottom:"0px", marginBottom:"0px",borderRadius:"10px 0px 0px 0px"}}
            />
            <p style={{maxWidth:"100%",borderRadius:"0px 0px 10px 10px"}}>{message.message.text}</p>
          </div>
        )}
        {message.message.img && !message.message.text && (
          <img
            src={message.message.img}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        )}
        {message.message.text && !message.message.img && (
          <p>{message.message.text}</p>
        )}
          </div>
        </div>
      </>
    );
} 

export default Message;