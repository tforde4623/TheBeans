import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getPosts } from '../../store/posts';
import ShowPost from '../ShowPost';
import './splashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cats, setCats] = useState([]);
  const posts = useSelector(state => state.posts);
  const [axiosErrs, setAxiosErrs] = useState('');
  const [currHeroImg, setCurrentHeroImg] = useState(cats[0]);
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

  const handlePostClick = post => {
    setIsOpen(post);
    setOpenPost(post);
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
    dispatch(getPosts());
  }, [dispatch])
  
  return (
    <div className='splash-main-container'>
      <div className='hero-header'>What are you looking for?</div>
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
