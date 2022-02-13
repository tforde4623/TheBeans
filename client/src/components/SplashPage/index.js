import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroCarousel from './HeroCarousel';
import { getPosts } from '../../store/posts';
import ShowPost from '../ShowPost';
import './splashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const [isOpen, setIsOpen] = useState(null);
  const [openPost, setOpenPost] = useState(null);

  const navbar = document.querySelector('.main-navbar');
  if (navbar) {
    navbar.style.backgroundColor = '#CB997E';
  }

  window.addEventListener('scroll', () => {

    if (navbar && window.scrollY <= 24 && window.location.pathname === '/') {
      navbar.style.backgroundColor = '#CB997E';
    } else if (navbar) {
      navbar.style.backgroundColor = '#6B705C';
    }
  });


  const getRecents = postList => {
    const tmp = [];
    const numItems = window.innerWidth > 900 ? 9 : 8;

    for (let i = 0; i < numItems; i++) {
      if (!postList[i]) {
        break;
      }

      // title previews for recent post boxes
      if (postList[i].title.length > 10) {
        postList[i].shortenedTitle = `${postList[i].title.slice(0, 12)} ...`;
      } else {
        postList[i].shortenedTitle = postList[i].title;
      }

      tmp.push(postList[i]);
    };
    return tmp;
  };


  const handlePostClick = post => {
    setIsOpen(post);
    setOpenPost(post);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])
  
  return (
    <div className='splash-main-container'>
      <div className='hero-header'>What are you looking for?</div>

      <HeroCarousel />

      <h2 className='posts-header'>Recent Posts</h2>
      <div className='posts-grid-container'>
        {posts && getRecents(Object.values(posts).reverse()).map(p => (
          <div 
            key={p.id}
            onClick={() => handlePostClick(p)} 
            className='post-preview'
          >
            <img className='post-prev-img' src={p.img_url} alt='preview of category'/>
            <div className={p.shortenedTitle?.length < 10 ? 'short-post-title' : 'post-title'}>{p.shortenedTitle}</div>
            <div className='darkened-overlay'></div>
          </div>
        ))}
      </div>
      { isOpen && <ShowPost post={openPost} isOpen={isOpen} setIsOpen={setIsOpen}/> }
    </div>
  );
};

export default SplashPage;
