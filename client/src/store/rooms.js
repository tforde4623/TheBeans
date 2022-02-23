const LOAD_ROOMS = 'rooms/load';

const loadRooms = rooms => ({
  type: LOAD_ROOMS,
  rooms
});

export const getRooms = user_id => async dispatch => {
  const res = await fetch(`/api/users/${user_id}/rooms`);
  const json = await res.json()

  if (res.ok) {
    dispatch(loadRooms(json));
  }


  return json;
};

const ADD_ROOM = 'rooms/add';

const addRoom = room => ({
  type: ADD_ROOM,
  room
});

export const postRoom = recipientId => async dispatch => {
  const res = await fetch('/api/chat/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recipient_id: recipientId })
  });
  const json = await res.json();

  if (!json.errors) {
    dispatch(addRoom(json));
  }

  return json;
};


const initialState = {};

const roomReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case ADD_ROOM:
      newState[action.room.id] = action.room
      return newState;

    case LOAD_ROOMS:
      action.rooms.forEach(room => {
        newState[room.id] = room;
      });

      return newState;

    default:
      return state;
  } 
};

export default roomReducer;
