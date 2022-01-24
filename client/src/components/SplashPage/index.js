import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getPosts } from '../../store/posts';
import './splashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cats, setCats] = useState([]);
  const posts = useSelector(state => state.posts);
  const [axiosErrs, setAxiosErrs] = useState('');
  const [currHeroImg, setCurrentHeroImg] = useState(cats[0]);

  // recent
  const getRecents = postList => {
    const tmp = [];
    for (let i = 0; i <= 6; i++) {
      if (!postList[i]) {
        break;
      }

      postList[i].title = postList[i].title.slice(0, 12) + '...';
      tmp.push(postList[i]);
    };

    return tmp;
  };

  const cycleImg = () => {
    const currIdx = cats.indexOf(currHeroImg);
    if (cats) {
      if (currIdx + 1 < cats.length) {
        setCurrentHeroImg(cats[currIdx + 1]);
      } else {
        // doesn't exist
        setCurrentHeroImg(cats[0])
      }
    }
  };

  useEffect(() => {
    (async () => {
      axios.get('/api/categories/')
        .then(res => {
          setCats(res.data);
          setCurrentHeroImg(res.data[0])
        })
        .catch(() => setAxiosErrs('Could not load preview!')); // TODO: handle
    })();
    dispatch(getPosts());
  }, [dispatch])
  
  return (
    <div className='splash-main-container'>
      <div className='hero-container'>
        <button className='hero-btn' onClick={cycleImg}>
          <i class="fas fa-chevron-left fa-lg"></i>
        </button>
        <img 
          onClick={() => history.push(`/posts/${currHeroImg.id}`)} 
          src={currHeroImg?.img_url} alt='hero previews'/>
        <button className='hero-btn' onClick={cycleImg}>
          <i class="fas fa-chevron-right fa-lg"></i>
        </button>
      </div>
      <div className='posts-grid-container'>
        {posts && getRecents(Object.values(posts).reverse()).map(p => (
          <div className='post-preview'>
            <img className='post-prev-img' src={p.img_url} alt='preview of category'/>
            <div className='post-title'>{p.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplashPage;
