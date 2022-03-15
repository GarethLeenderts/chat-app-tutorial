import './App.css';
import { useState } from 'react';
import io from "socket.io-client";

import Chat from './Chat.js';

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  

  return (
    <div className="App">
      <h2>Join a Chat Room</h2>
      <input type="Text" placeholder="Name" onChange={(event) => {setUsername(event.target.value)}}/>
      <input type="text" placeholder="Room ID" onChange={(event) => {setRoom(event.target.value)}}/>
      <button onClick={joinRoom}>Join a Room</button>

      <Chat socket={socket} username={username} room={room}/>

    </div>
  );
}

export default App;
