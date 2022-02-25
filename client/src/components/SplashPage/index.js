import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { getPosts } from '../../store/posts';
import { getCategories } from '../../store/categories';
import ShowPost from '../ShowPost';
import PostPreview from './PostPreview';
import './splashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector(state => state.posts);
  const [isOpen, setIsOpen] = useState(null);
  const [openPost, setOpenPost] = useState(null);

  const HeroBackground = styled.img`
    width: 100%;
    height: 50vw;
    z-index: -3;
  `;

  const getRecents = postList => {
    const tmp = [];
    const numItems = 12;

    for (let i = 0; i < numItems; i++) {
      if (!postList[i]) {
        break;
      }

      // title previews for recent post boxes
      if (postList[i].title.length > 10) {
        postList[i].shortenedTitle = `${postList[i].title.slice(0, 9)} ...`;
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
    dispatch(getCategories());
  }, [dispatch])
  
  return (
    <div className='splash-main-container'>

        <div className='hero-center'>
          <HeroBackground src='https://raw.githubusercontent.com/tforde4623/TheBeans/main/img-assets/hero.png' alt='hero background'/>
          <button className='hero-btn' onClick={() => history.push('/posts')}>See More Posts!</button>
        </div>

      <div className='posts-grid-container'>
        {posts && getRecents(Object.values(posts).reverse()).map(p => (

          <PostPreview post={p} handlePostClick={handlePostClick}/>

        ))}
      </div>

      { isOpen && <ShowPost post={openPost} isOpen={isOpen} setIsOpen={setIsOpen}/> }
    </div>
  );
};

export default SplashPage;
