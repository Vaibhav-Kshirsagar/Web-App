import React from "react";
import Message from "./Message";
import { ChatContext } from "../Context/ChatContext"; 
import { db } from "../Pages/Firebase";
import { doc,onSnapshot } from "firebase/firestore";
import { useState,useContext,useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <>
      <div className="messages">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    </>
  );
};

export default Messages;
