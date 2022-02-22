import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../store/rooms';

const ConvoList = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);

  useEffect(() => {
    if (userId) {
      dispatch(getRooms(userId));  
    }
  }, [userId, dispatch]);

  // this will be users rooms
  const rooms = useSelector(state => state.rooms);
  console.log('rooms', rooms)

  return (
    <div className='convo-list-container'>
      {rooms && Object.values(rooms).map(room => (
        <div key={room.id} className='convo-block'>
          {room.other_user.username}
        </div>
      ))} 
    </div>
  )
}

export default ConvoList;
