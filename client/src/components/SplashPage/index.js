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
  const [isOpen, setIsOpen] = useState(false);
  const [openPost, setOpenPost] = useState(null);

  const getRecents = postList => {
    const tmp = [];
    for (let i = 0; i <= 6; i++) {
      if (!postList[i]) {
        break;
      }
      postList[i].title = `${postList[i].title.slice(0, 12)} ${'.'.repeat(3)}`;
      tmp.push(postList[i]);
    };
    return tmp;
  };

  const cycleImg = direction => {
    const currIdx = cats.indexOf(currHeroImg);

    if (direction === 0) {
      document.querySelector('.hero-img').classList.add('animate-spin');
      document.querySelector('.cat-name').classList.add('animate-spin');

      setTimeout(() => {
        document.querySelector('.hero-img').classList.remove('animate-spin');
        document.querySelector('.cat-name').classList.remove('animate-spin');
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

      setTimeout(() => {
        document.querySelector('.hero-img').classList.remove('animate-spin-backwards');
        document.querySelector('.cat-name').classList.remove('animate-spin-backwards');
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
    setIsOpen(true);
    setOpenPost(post);
  };

  useEffect(() => {
    (async () => {
      axios.get('/api/categories/')
        .then(res => {
          setCats(res.data);
          setCurrentHeroImg(res.data[0]);
        })
        .catch(() => setAxiosErrs('Could not load preview!')); // TODO: handle
    })();
    dispatch(getPosts());
  }, [dispatch])
  
  return (
    <div className='splash-main-container'>
      <div className='hero-container'>
      { axiosErrs && <div>{ axiosErrs }</div> }
        <button className='hero-btn' onClick={() => cycleImg(1)}>
          <i className="fas fa-chevron-left fa-lg"></i>
        </button>
        <img 
          className='hero-img'
          onClick={() => history.push(`/posts/${currHeroImg.id}`)} 
          src={currHeroImg?.img_url} alt='hero previews'/>
        <div className='cat-name'>{currHeroImg?.name}</div>
        <button className='hero-btn' onClick={() => cycleImg(0)}>
          <i className="fas fa-chevron-right fa-lg"></i>
        </button>
      </div>
      <div className='posts-grid-container'>
        {posts && getRecents(Object.values(posts).reverse()).map(p => (
          <div 
            key={p.id}
            onClick={() => handlePostClick(p)} 
            className='post-preview'
          >
            <img className='post-prev-img' src={p.img_url} alt='preview of category'/>
            <div className='post-title'>{p.title}</div>
          </div>
        ))}
      </div>
      { isOpen && <ShowPost post={openPost} isOpen={isOpen} setIsOpen={setIsOpen}/> }
    </div>
  );
};

export default SplashPage;
