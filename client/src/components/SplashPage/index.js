import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { getPosts } from '../../store/posts';
import { getCategories } from '../../store/categories';
import ShowPost from '../ShowPost';
import PostPreview from './PostPreview';
import './splashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const [isOpen, setIsOpen] = useState(null);
  const [openPost, setOpenPost] = useState(null);

  const HeroBackground = styled.img`
    width: 100%;
    height: 50vw;
    z-index: -3;
  `;

  const Hero = styled.div`
    width 100%;
    height: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const PostsButton = styled.button`
    background-color: #CB997E;
    position: absolute;
    padding: 15px;
    border: none;
    border-radius: 25px;
    z-index: -2;
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

      <Hero>
        <HeroBackground src='/hero.png' alt='hero background'/>
        <PostsButton>See More Posts</PostsButton>
      </Hero>

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
