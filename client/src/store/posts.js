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

// =============== actual reducer ================= //

const initialState = { posts: {}, currPost: {} };

const postReducer = (state = initialState, action) => {
  const newState = {};

  switch (action.type) {
    case LOAD_ALL_POSTS:
      newState.posts = {};
      action.posts.forEach(p => {
        newState.posts[p.id] = p;
      });

      newState.currPost = state.currPost;
      return newState;

    case ADD_POST:
      newState.posts = state.posts;
      newState.posts[action.post.id] = action.post; 
      newState.currPost = state.currPost;

      return newState; // TODO: test this (re-rendering)

    default:
      return state;
  }
}

export default postReducer;
