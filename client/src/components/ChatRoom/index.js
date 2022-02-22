import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import UserSearch from './UserSearch';

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
      <UserSearch /> 
    </div>
  )
}

export default ChatRoom;
