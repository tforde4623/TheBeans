import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { animateCycle, getCategories } from './utils/cycleImage';

const HeroCarousel = () => {
  const history = useHistory();
  const [cats, setCats] = useState([]);
  const [currHeroImg, setCurrentHeroImg] = useState(cats[0]);

  const cycleImg = direction => {
    const currIdx = cats.indexOf(currHeroImg);
    const elements = ['.hero-img', '.cat-name', '.darkened-overlay-hero'];

    if (direction === 0) {
      animateCycle(elements, 'animate-spin');

      if (cats) {
        if (currIdx + 1 < cats.length) {
          setCurrentHeroImg(cats[currIdx + 1]);
        } else {
          // doesn't exist
          setCurrentHeroImg(cats[0]);
        }
      }
    } else {
      animateCycle(elements, 'animate-spin-backwards');

      if (cats) {
        if (currIdx - 1 >= 0) {
          setCurrentHeroImg(cats[currIdx - 1]);
        } else {
          // doesn't exist
          setCurrentHeroImg(cats[cats.length-1]);
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      setCats(categories);
      setCurrentHeroImg(categories[0]);
    })()
  }, []);

  return (
    <div className='hero-container'>
      {/* TODO: axios error handling */}
      <button className='hero-btn' onClick={() => cycleImg(1)}>
        <i className="fas fa-chevron-left fa-lg"></i>
      </button>
      <div className='hero-img-container'>
        <img 
          className='hero-img'
          onClick={() => history.push(`/posts/${currHeroImg.id}`)} 
          src={currHeroImg?.img_url} alt='hero previews'/>
        <div className='darkened-overlay-hero'></div>
        <div className='cat-name'>{currHeroImg?.name}</div>
      </div>
      <button className='hero-btn' onClick={() => cycleImg(0)}>
        <i className="fas fa-chevron-right fa-lg"></i>
      </button>
    </div>
  )
}

export default HeroCarousel;
