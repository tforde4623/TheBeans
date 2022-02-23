import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import UserSearch from './UserSearch';
import ConvoList from './ConvoList';
import './chatRoom.css';
import { useSelector } from 'react-redux';

let socket;

const ChatRoom = () => {
  const userId = useSelector(state => state.session.user.id);
  const [showResults, setShowRes] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgContent, setMsgContent] = useState('');
  // state thread for child compoent
  const [room, setRoom] = useState();
  const [query, setQuery] = useState('');

  // handle show/hide of search results (in child component)
  const setShowResults = (e, val) => {
    e.stopPropagation();
    setShowRes(val);
    setQuery('');
  };

  const handleMsgSubmit = e => {
    e.preventDefault();
    setMsgContent('');

    // send msgs
    socket.emit('message', {
      content: msgContent, 
      room_id: room
    });
  };

  useEffect(() => {

    socket = io();

    // recieve msgs
    socket.on('message', data => {
      setMessages(msgs => [...msgs, data]);
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

      // get rooms prev msgs
      (async () => {
        // TODO: figure out rooms
        const res = await fetch(`/api/chat/rooms/${room}/messages`);
        const json = await res.json();

        setMessages(json.messages);
      })();
    }
  }, [room]);

  return (
    <div 
      // we want to close our search results if anywhere in body is clicked
      onClick={(e) => setShowResults(e, false)}
      className='chat-container'
    >

      <div className='chat-container-left'>
        <UserSearch 
          query={query}
          setQuery={setQuery}
          showResults={showResults} 
          setShowResults={setShowResults}/> 
        <ConvoList setRoom={setRoom}/>
      </div>

      <div className='chat-container-right'>
        <div className='container-box'>
          {messages?.length > 0 && messages.map(msg => (
            <div 
              className={msg.owner_id === userId ? 'owned-msg' : 'unowned-msg'} 
              key={msg.id}
            >
              {/* ind. msg content */}
              <div>{msg.owner_obj.username}</div>
              <div>{msg.content}</div>
            </div>
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
