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
    return dispatch(loadPosts(data));
  };
};

const initialState = { posts: {}, currPost: {} };

const postReducer = (state = initialState, action) => {
  let newState = { ...state }

  switch (action.type) {
    case LOAD_ALL_POSTS:
      action.posts.forEach(p => {
        newState.posts[p.id] = p;
      });

      return { ...newState, ...state.currPost };
    default:
      return state;
  }
}

export default postReducer;
