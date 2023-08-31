import React from 'react';
import style from "./Main.module.scss";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {BsEmojiSmile} from "react-icons/bs";
import {IoSendSharp} from "react-icons/io5";

const TextareaSection = (sendNewMessage,setMessage,message,openEmoji,handleEmojiSelect,setOpenEmoji) => {
  return (
    <div className={style.textarea}>
          <textarea onKeyDown={sendNewMessage} placeholder={"Write message ...."} value={message}
                    onChange={(e) => setMessage(e.target.value)}
          >
          </textarea>
      {openEmoji &&
        <div className={style.picker}><Picker data={data} onEmojiSelect={handleEmojiSelect}></Picker></div>}
      <BsEmojiSmile className={style.smile} onClick={() => setOpenEmoji(!openEmoji)}></BsEmojiSmile>
      <IoSendSharp onClick={sendNewMessage}></IoSendSharp>
    </div>
  );
};

export default TextareaSection;