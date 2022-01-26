import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

import { getPostsByCatId } from '../../store/posts'; 
import HomeFeedCard from '../HomeFeedCard';
import './homeFeed.css';

const HomeFeed = () => {
  const { catId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts) || [];

  useEffect(() => {
    dispatch(getPostsByCatId(catId));
  }, [dispatch, catId]);

  return (
    <div className='container'>
      {posts && Object.values(posts).reverse().map(post => (
        <div key={post.id}>
          <HomeFeedCard key={post.id} post={post}/>
        </div>
      ))}
    </div>
  );  
};

export default HomeFeed;
