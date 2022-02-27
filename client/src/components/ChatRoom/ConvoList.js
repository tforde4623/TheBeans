import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../store/rooms';

const ConvoList = ({ setRoom }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    dispatch(getRooms(userId));

    const interval = setInterval(() => {
      dispatch(getRooms(userId));
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [userId, dispatch]);

  const rooms = useSelector(state => state.rooms);
  
  return (
    <div className='convo-list-container'>
      {rooms && Object.values(rooms).map(room => (
        <div 
          onClick={() => {
            setRoom(room.id)
            setClear(true);
          }}
          key={room.id} 
          className='convo-block'
        >
          <div>
            {room.other_user?.username}
          </div>
            {room.recipient_id === userId && 
                room.recipient_has_seen === false && !clear ? 
              <div>New!</div> : null}
        </div>
      ))} 
    </div>
  )
}

export default ConvoList;
