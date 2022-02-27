import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { getPosts, getPostsByCatId } from '../../store/posts'; 
import { getLikes } from '../../store/likes';
import HomeFeedCard from '../HomeFeedCard';
import './homeFeed.css';

const HomeFeed = ({ categoryId }) => {
  // homefeed will take in an optional category id in case user
  // clicks on a category on the splash page vs the see more posts (all button).
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getLikes());

    // if that category id is present, populate store with posts pertaining
    // to selected category
    if (categoryId) {
      dispatch(getPostsByCatId());
    }
  }, [dispatch, categoryId]);

  const posts = useSelector(state => state.posts) || [];
  const likes = useSelector(state => state.likes) || [];

  return (
    <div className='container'>
      {posts && Object.values(posts).reverse().map(post => (
        <HomeFeedCard 
          key={post.id} 
          post={post} 
          likes={Object.values(likes).filter(like => like.post_id === post.id)} />
      ))}
    </div>
  );  
};

export default HomeFeed;
