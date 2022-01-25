// get post Comments
const LOAD_POST_COMMENTS = 'comments/load'

const loadComments = comments => ({
  type: LOAD_POST_COMMENTS,
  comments
});

export const getPostComments = postId => async dispatch => {
  const res = await fetch(`/api/comments/${postId}`);

  const data = await res.json();
  if (res.ok) dispatch(loadComments(data));
  return data;
};


const ADD_COMMENT = 'comments/add';

const addComment = comment => ({
  type: ADD_COMMENT,
  comment
});

export const postComment = (comment, post_id) => async dispatch => {
  const res = await fetch('/api/comments/', {
    method: 'post',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      content: comment.content,
      post_id: post_id,
    })
  });

  const data = await res.json();
  if (res.ok) dispatch(addComment(data));
  return data;
};


const EDIT_COMMENT = 'comment/edit';

const editComment = comment => ({
  type: EDIT_COMMENT,
  comment
});

export const putComment = post => async dispatch => {
  const res = await fetch(`/api/comments/${post.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post.content)
  });

  const data = await res.json();
  if (res.ok) dispatch(editComment(data));
  return data;
};


const initialState = {};

const commentReducer = (state = initialState, action) => {
  let newState = {};

  switch(action.type) {
    case LOAD_POST_COMMENTS:
      action.comments.forEach(c => {
        newState[c.id] = c;
      });
      return newState;

    case ADD_COMMENT:
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;

    case EDIT_COMMENT:
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;

    default:
      return state;
  }
};

export default commentReducer;
