import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../store/rooms';

const ConvoList = ({ setRoom }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);

  useEffect(() => {
    dispatch(getRooms(userId));
  }, [userId, dispatch]);

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
