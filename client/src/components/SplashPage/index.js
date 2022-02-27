import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { getPosts } from '../../store/posts';
import { getCategories } from '../../store/categories';
import './splashPage.css';

const HeroBackground = styled.img`
  width: 100%;
  height: 50vw;
  z-index: -3;
  position: absolute;
  top: 0;
`;

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCategories());
  }, [dispatch])

  const categories = useSelector(state => state.categories);
  
  return (
    <div className='splash-main-container'>

        <div className='hero-center'>
          <HeroBackground src='new-hero.jpg' alt='hero background'/>
          <button 
            className='hero-btn' 
            onClick={() => history.push('/posts')}>See More Posts!</button>
        </div>

      <div className='category-grid-container'>
        {categories && Object.values(categories).map(category => (
        <div 
            key={category.id} 
            className='single-cat-container'
            onClick={() => history.push(`/posts/${category.id}`)}>
          
          <img src={category.img_url} alt='category preview'/>
          <div className='single-cat-title'>{category.name}</div>
        </div>
        ))}

      </div>
    </div>
  );
};

export default SplashPage;
