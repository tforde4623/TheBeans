// add a like
const ADD_LIKE = 'likes/add';

const addLike = like => ({
  type: ADD_LIKE,
  like
});

export const postLike = like => async dispatch => {
  const res = await fetch('/api/likes', {
    type: 'POST',
    headers: {'content-type': 'application/json'},
    body: {
      user_id: like.user_id,
      post_id: like.post_id
    }
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(addLike(data));
  }

  return res;
};

const initialState = {};

const likeReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case ADD_LIKE:
      newState[action.like.id] = action.like
      return newState;

    default:
      return state;
  } 
};

export default likeReducer;
