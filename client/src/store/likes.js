// add a like
const ADD_LIKE = 'likes/add';

const addLike = like => ({
  type: ADD_LIKE,
  like
});

export const postLike = like => async dispatch => {
  const res = await fetch('/api/likes/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      user_id: like.user_id,
      post_id: like.post_id
    })
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(addLike(data));
  }

  return res;
};

const LOAD_LIKES = 'likes/load';

const loadLikes = likes => ({
  type: LOAD_LIKES,
  likes
});


export const getLikes = () => async dispatch => {
  const res = await fetch('/api/likes/');
  const data = await res.json();

  if (res.ok) {
    dispatch(loadLikes(data));
  }

  return res;
};

const REMOVE_LIKE = 'likes/remove';

const removeLike = id => ({
  type: REMOVE_LIKE,
  id
});

export const deleteLike = id => async dispatch => {
  console.log(id);
  const res = await fetch(`/api/likes/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(removeLike(id));
  }

  return data;
};

const initialState = {};

const likeReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case ADD_LIKE:
      newState[action.like.id] = action.like
      return newState;

    case LOAD_LIKES:
      action.likes.forEach(like => {
        newState[like.id] = like;
      });

      return newState;

    case REMOVE_LIKE:
      delete newState[action.id];
      return newState;

    default:
      return state;
  } 
};

export default likeReducer;
