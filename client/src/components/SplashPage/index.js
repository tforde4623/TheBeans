import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { getPosts } from '../../store/posts';
import { getCategories } from '../../store/categories';
import './splashPage.css';

const HeroBackground = styled.img`
  width: 100%;
  height: 60vw;
  z-index: -3;
  position: absolute;
  top: 0;
  filter: brightness(60%)
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
          <HeroBackground src={process.env.PUBLIC_URL + '/new-hero.jpg'} alt='hero background'/>
          <div className='hero-div-container'>
            <div className='hero-div-header'>Welcome to The Beans!</div>
            <div className='hero-div'>
              Discover coffee <br/>
              recipes, beans <br/>
              and new cafes!
            </div>
            <button className='hero-btn' onClick={() => history.push('/posts')}>See More Posts!</button>
          </div>
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
