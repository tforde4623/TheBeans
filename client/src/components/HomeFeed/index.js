import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { getPosts } from '../../store/posts'; 
import ShowPost from '../ShowPost';
import HomeFeedCard from '../HomeFeedCard';
import './homeFeed.css';

const HomeFeed = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openPost, setOpenPost] = useState(false);

  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    navbar.style.backgroundColor = '#6B705C';
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
