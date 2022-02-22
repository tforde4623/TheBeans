import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import UserSearch from './UserSearch';
import ConvoList from './ConvoList';
import './chatRoom.css';

let socket;

const ChatRoom = () => {
  const [showResults, setShowRes] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgContent, setMsgContent] = useState('');
  const [room, setRoom] = useState();

  // handle show/hide of search results (in child component)
  const setShowResults = (e, val) => {
    e.stopPropagation();
    setShowRes(val);
  };

  const handleMsgSubmit = e => {
    e.preventDefault();

    // send msgs
    socket.emit('message', {'id': 'test', 'content': msgContent, 'room_id': room});
  };

  useEffect(() => {
    // get rooms prev msgs
    (async () => {
      // TODO: figure out rooms
      const res = await fetch(`/api/chat/rooms/${1}/messages`);
      const json = await res.json();

      setMessages(json.messages);
    })();

    socket = io();

    // recieve msgs
    socket.on('message', data => {
      if (messages && messages?.length) {
        setMessages(msgs => [...msgs, data]);
      } else {
        setMessages([data]);
      }
    });

    // cleanup: disconnect on component dismount
    return (() => {
      socket.disconnect();
    });
  }, []);

  // room change
  useEffect(() => {
    if (room) {
      socket.emit('join-room', { 'room_id': room });
    }
  }, [room]);

  return (
    <div 
      // we want to close our search results if anywhere in body is clicked
      onClick={(e) => setShowResults(e, false)}
      className='chat-container'
    >

      <div className='chat-container-left'>
        <UserSearch showResults={showResults} setShowResults={setShowResults}/> 
        <ConvoList setRoom={setRoom}/>
      </div>

      <div className='chat-container-right'>
        {/* TODO: this is temp */}
        {room}
        <div className='container-box'>
          {messages?.length > 0 && messages.map(msg => (
            <div key={msg.id}>{msg.content}</div>
          ))}
        </div>
        {/* TODO: move this*/}
        <div className='msg-form'>
          <form onSubmit={handleMsgSubmit}>
            <input 
              onChange={e => setMsgContent(e.target.value)}
              value={msgContent}
              type='text'/>
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default ChatRoom;
