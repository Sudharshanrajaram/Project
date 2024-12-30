import React, { useEffect, useRef, useState } from "react";

import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";
import ChatList from "./ChatList";
import { message } from "antd";

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("chatUser"));
  const socketio = socketIOClient("http://localhost:5000");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socketio.on("chat", (chats) => {
      message.success("New Message");
      setChats(chats);
    });

    socketio.on('message', (msg) => {
      message.success("New Message");
      setChats((prevChats) => [...prevChats, msg])
    })

    return () => {
      socketio.off('chat')
      socketio.off('message')
    }
  }, []);

  const addMessage = (chat) => {
    const newChat = {
      username: localStorage.getItem("chatUser"),
      message: chat,
      avatar: localStorage.getItem("avatar"),
    };
    socketio.emit('newMessage', newChat)
  };

  const Logout = () => {
    localStorage.removeItem("chatUser")
    localStorage.removeItem('avatar')
    setUser('')
  }

  return (
    <div className=" mt-4">
      {user ? (
        <div className="px-10 ">
          <div className="flex justify-between items-center bg-[#FF9D3D] text-white py-2 px-5">  
            <h4 className="text-xl">User : {user}</h4>
            
            <p className="border-2 border-white px-3 py-1 rounded-lg" onClick={Logout}>
              <strong>Logout</strong>
            </p>
          </div>
          <ChatList chats={chats} />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;