import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const InputText = ({addMessage}) => {
    const [message, setMessage] = useState()
    const sendMessage = () => {
        addMessage(message)
        setMessage("")
    }
  return (
    <div className="flex justify-center h-14 mt-5">
      <textarea className=" p-2 border w-full border-gray-300 rounded-md "
        name="message"
        id="message"
        rows="6"
        placeholder="Input Message ..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <button className="bg-[#FF9D3D] px-5 text-white ml-5 rounded-lg" onClick={sendMessage}><FaPaperPlane /></button>
    </div>
  );
};

export default InputText;