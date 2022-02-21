import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import { getPosts } from '../../store/posts'; 
import { getLikes } from '../../store/likes';
// import ShowPost from '../ShowPost';
import HomeFeedCard from '../HomeFeedCard';
import './homeFeed.css';

const HomeFeed = () => {
  const dispatch = useDispatch();
  // const [isOpen, setIsOpen] = useState(false);
  // const [openPost, setOpenPost] = useState(false);

  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    navbar.style.backgroundColor = '#6B705C';
  }

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getLikes());
  }, [dispatch]);

  const posts = useSelector(state => state.posts) || [];
  const likes = useSelector(state => state.likes) || [];

  // do we need this?
  // const openModal = post => {
  //   setOpenPost(post);
  //   setIsOpen(true);
  // };

  return (
    <div className='container'>
      {posts && Object.values(posts).reverse().map(post => (
        <HomeFeedCard 
          key={post.id} 
          post={post} 
          likes={Object.values(likes).filter(like => like.post_id === post.id)} />
      ))}
      {/* { isOpen && <ShowPost post={openPost} setIsOpen={setIsOpen} /> } */}
    </div>
  );  
};

export default HomeFeed;
