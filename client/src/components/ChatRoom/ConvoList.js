import React from 'react';
import { useSelector } from 'react-redux';

const ConvoList = ({ setRoom }) => {
  const rooms = useSelector(state => state.rooms);

  return (
    <div className='convo-list-container'>
      {rooms && Object.values(rooms).map(room => (
        <div 
          onClick={() => setRoom(room.id)}
          key={room.id} 
          className='convo-block'>
          {room.other_user?.username}
        </div>
      ))} 
    </div>
  )
}

export default ConvoList;
