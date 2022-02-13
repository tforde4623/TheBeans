import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const HeroCarousel = () => {
  const history = useHistory();
  const [cats, setCats] = useState([]);
  const [currHeroImg, setCurrentHeroImg] = useState(cats[0]);
  const [axiosErrs, setAxiosErrs] = useState('');

  const cycleImg = direction => {
    const currIdx = cats.indexOf(currHeroImg);

    if (direction === 0) {
      document.querySelector('.hero-img').classList.add('animate-spin');
      document.querySelector('.cat-name').classList.add('animate-spin');
      document.querySelector('.darkened-overlay-hero').classList.add('animate-spin');

      setTimeout(() => {
        document.querySelector('.hero-img').classList.remove('animate-spin');
        document.querySelector('.cat-name').classList.remove('animate-spin');
        document.querySelector('.darkened-overlay-hero').classList.remove('animate-spin');
      }, 250);

      if (cats) {
        if (currIdx + 1 < cats.length) {
          setCurrentHeroImg(cats[currIdx + 1]);
        } else {
          // doesn't exist
          setCurrentHeroImg(cats[0]);
        }
      }
    } else {
      document.querySelector('.hero-img').classList.add('animate-spin-backwards');
      document.querySelector('.cat-name').classList.add('animate-spin-backwards');
      document.querySelector('.darkened-overlay-hero')
        .classList.add('animate-spin-backwards');

      setTimeout(() => {
        document.querySelector('.hero-img').classList.remove('animate-spin-backwards');
        document.querySelector('.cat-name').classList.remove('animate-spin-backwards');
        document.querySelector('.darkened-overlay-hero')
          .classList.remove('animate-spin-backwards');
      }, 250);

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
      axios.get('/api/categories/')
        .then(res => {
          setCats(res.data);
          setCurrentHeroImg(res.data[0]);
        })
        .catch(() => setAxiosErrs('Could not load preview!'));
    })();
  }, []);

  return (
    <div className='hero-container'>
    { axiosErrs && <div>{ axiosErrs }</div> }
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
