import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

let socket;

const ChatRoom = () => {
  useEffect(() => {
    socket = io();

    // cleanup: disconnect on component dismount
    return (() => {
      socket.disconnect();
    });
  }, []);

  return (
    <div>
            
    </div>
  )
}

export default ChatRoom;
