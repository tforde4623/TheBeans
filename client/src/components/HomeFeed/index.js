import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { getPosts } from '../../store/posts'; 
import HomeFeedCard from '../HomeFeedCard';
import './homeFeed.css';

const HomeFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts) || [];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className='container'>
      {posts && Object.values(posts).reverse().map(post => (
        <p>
          <HomeFeedCard key={post.id} post={post}/>
        </p>
      ))}
    </div>
  );  
};

export default HomeFeed;
