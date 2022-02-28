import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import UserSearch from './UserSearch';
import ConvoList from './ConvoList';
import { useDispatch, useSelector } from 'react-redux';
import { postRoom } from '../../store/rooms';
import './chatRoom.css';

let socket;

const ChatRoom = () => {
  const { reqUserId } = useParams(); // optional parameter
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);
  const msgEnd = useRef(null);
  const [showResults, setShowRes] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgContent, setMsgContent] = useState('');
  // state thread for child compoent
  const [room, setRoom] = useState();
  const [query, setQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  // handle show/hide of search results (in child component)
  const setShowResults = (e, val) => {
    if (e) {
      e.stopPropagation();
    }

    setShowRes(val);
    setQuery('');
  };

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    setMsgContent('');

    // send msgs
    socket.emit('message', {
      content: msgContent,
      room_id: room,
    });
  };

  const scrollMsgs = () => {
    if (msgEnd) {
      setTimeout(() => {
        msgEnd.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }, 150);
    }
  };

  // initiate socket io connection and msg 'listener'
  useEffect(() => {
    socket = io();

    // recieve msgs
    socket.on('message', (data) => {
      setIsEmpty(false);
      setMessages(msgs => [...msgs, data]);
      scrollMsgs();
    });

    // cleanup: disconnect on component dismount
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  // if an id was passed as a parameter,
  // make it if doesn't exist, load it if it does
  useEffect(() => {
    if (reqUserId) {
      dispatch(postRoom(reqUserId)).then((res) => {
        if (res.errors) {
          if (res.errors.duplicate) {
            setRoom(res.room_id);
          }
        } else if (res.room) {
          setRoom(res.room.id);
        }
      });
    }
  }, [dispatch, reqUserId]);

  // room change
  useEffect(() => {
    if (room) {
      socket.emit('join-room', { room_id: room });

      // get rooms prev msgs
      (async () => {
        // TODO: figure out rooms
        const res = await fetch(`/api/chat/rooms/${room}/messages`);
        const json = await res.json();

        if (json.messages) {
          if (json.messages.length) {
            setMessages(json.messages);
            setIsEmpty(false);
          } else if (!json.messages.length) {
            setIsEmpty(true);
          }
        }

        scrollMsgs();
      })();
    }
  }, [room]);

  return (
    <div
      // we want to close our search results if anywhere in body is clicked
      onClick={(e) => setShowResults(e, false)}
      className="chat-container"
    >
      <div className="chat-container-left">
        <UserSearch
          query={query}
          setQuery={setQuery}
          showResults={showResults}
          setShowResults={setShowResults}
        />
        <ConvoList setRoom={setRoom} />
      </div>

      <div className="chat-container-right">
        <div className="container-box">
          {!room ? (
            <div className="msgs-msg">
              Choose a user from the left bar to chat with!
            </div>
          ) : isEmpty ? (
            <div className="msgs-msg">No messages yet with this user!</div>
          ) : (
            messages?.length > 0 &&
            messages.map((msg) => (
              <div
                className={
                  msg.owner_id === userId ? 'owned-msg' : 'unowned-msg'
                }
                key={msg.id}
              >
                {/* ind. msg content */}
                <div>{msg.owner_obj.username}</div>
                <div>{msg.content}</div>
              </div>
            ))
          )}
          {/* div for auto scroll */}
          <div style={{ float: 'left', clear: 'both' }} ref={msgEnd}></div>
        </div>

        {/* TODO: move this*/}
        <div className="msg-form">
          <form onSubmit={handleMsgSubmit}>
            <input
              onChange={(e) => setMsgContent(e.target.value)}
              placeholder="Send a message..."
              value={msgContent}
              type="text"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
