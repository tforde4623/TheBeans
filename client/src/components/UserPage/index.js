import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../store/posts';
import ShowPost from '../ShowPost';
import './userPage.css';

const UserPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const posts = useSelector(state => state.posts);
  const [isOpen, setIsOpen] = useState(false);
  const [openPost, setOpenPost] = useState(null);

  const handlePostClick = (post) => {
    setOpenPost(post);
    setIsOpen(true);
  };

  const handleOffClick = () => {
    if (isOpen) setIsOpen(null);
  };

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  return (
    <div onClick={handleOffClick}>
      <ul className='grid-img-container'>
        {posts && Object.values(posts).reverse().map(post => (
          <li key={post.id} className='grid-img-div' onClick={() => handlePostClick(post)}>
            <img 
              className='grid-img'
              src={post.img_url} 
              alt='yummi coffee'/>
          </li>
        ))}
      </ul>
      { isOpen && <ShowPost post={openPost} setIsOpen={setIsOpen}/> }
    </div>
  );
};

export default UserPage;
