// get all posts
const LOAD_ALL_POSTS = 'posts/load';

const loadPosts = posts => ({
  type: LOAD_ALL_POSTS,
  posts
});

export const getPosts = () => async dispatch => {
  const posts = await fetch('/api/posts/');

  if (posts.ok) {
    const data = await posts.json();
    dispatch(loadPosts(data));
  };
};

// add a post
const ADD_POST = 'posts/add';

const addPost = post => ({
  type: ADD_POST,
  post
});

export const createPost = imgData => async dispatch => {
  const res = await fetch('/api/posts/', {
    method: 'POST',
    body: imgData,
  });

  const data = await res.json();

  if (res.ok) {
    dispatch(addPost(data));
    return data;
  } else {
    return data;
  }
};


export const fetchUserPosts = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/posts`);
  const data = await res.json();
  if (res.ok) dispatch(loadPosts(data));
  return data;
};


// edit a post
const EDIT_POST = 'posts/edit';

const editPost = post => ({
  type: EDIT_POST,
  post
});

export const putPost = post => async dispatch => {
  const res = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: post.title,
      description: post.description
    })
  });

  const data = await res.json();
  if (res.ok) dispatch(editPost(data));
  return data;
};

// delete a post
const DELETE_POST = 'posts/delete';

const deletePost = postId => ({
  type: DELETE_POST,
  postId
});

export const removePost = postId => async dispatch => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: 'delete'
  });

  if (res.status === 204) return dispatch(deletePost(postId));
};

// get posts by category id
export const getPostsByCatId = catId => async dispatch => {
  const res = await fetch(`/api/categories/${catId}/posts`);
  const data = await res.json();

  if (res.ok) dispatch(loadPosts(data));
  return data;
};

// =============== actual reducer ================= //

const initialState = {};

const postReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case LOAD_ALL_POSTS:
      action.posts.forEach(p => {
        newState[p.id] = p;
      });
      return newState;

    case ADD_POST:
      newState[action.post.id] = action.post; 
      return newState;

    case EDIT_POST:
      newState[action.post.id] = action.post
      return newState;

    case DELETE_POST:
      delete newState[action.postId];

      return newState;

    default:
      return state;
  }
}

export default postReducer;
