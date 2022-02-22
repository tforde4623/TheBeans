import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import UserSearch from './UserSearch';
import ConvoList from './ConvoList';
import './chatRoom.css';

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
    <div className='chat-container'>
      <UserSearch /> 
      <ConvoList />
    </div>
  )
}

export default ChatRoom;
