import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

import { getPostsByCatId } from '../../store/posts'; 
import ShowPost from '../ShowPost';
import HomeFeedCard from '../HomeFeedCard';
import './homeFeed.css';

const HomeFeed = () => {
  const { catId } = useParams();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openPost, setOpenPost] = useState(false);

  useEffect(() => {
    dispatch(getPostsByCatId(catId));
  }, [dispatch, catId]);

  const posts = useSelector(state => state.posts) || [];

  const openModal = post => {
    setOpenPost(post);
    setIsOpen(true);
  };

  return (
    <div className='container'>
      {posts && Object.values(posts).reverse().map(post => (
        <div key={post.id} onClick={() => openModal(post)}>
          <HomeFeedCard key={post.id} post={post} />
        </div>
      ))}
      { isOpen && <ShowPost post={openPost} setIsOpen={setIsOpen} /> }
    </div>
  );  
};

export default HomeFeed;
