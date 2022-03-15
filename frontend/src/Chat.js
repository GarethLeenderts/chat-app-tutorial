import React from 'react'
import { useState, useEffect } from 'react'

function Chat({socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  // const [messageList, setMessageList] = useState([{author: "bob", time: "now", message: "hello"},
  //                                                 {author: "gerry", time: "a little later", message: "howzit"}]);

  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {

      const messageData = {
        roomID: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);
    }
  };

  // const updateMessageList = () => {
  //   // const messages = [...messageList];
  //   // messages.push(currentMessage);
  //   // setMessageList(messages);
  //   setMessageList([...messageList, currentMessage]);
  // };

  // Activate/fire and event whenever there is a change to our socket object
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket])

  return (
    <div>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>

        {messageList.map((message) => (
          <div>
            {/* <p>{message.time}</p>
            <p>{message.author}</p> */}
            <p>{message.message}</p>
          </div>
        ))}
      
      </div>
      
      <div className='chat-footer'>
        <input type='text' placeholder='Hey...' onChange={(event) => {setCurrentMessage(event.target.value)}} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat