import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/posts';
import './splashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const [cats, setCats] = useState([]);
  const posts = useSelector(state => state.posts);
  const [axiosErrs, setAxiosErrs] = useState('');

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

  useEffect(() => {
    (async () => {
      axios.get('/api/categories/')
        .then(res => setCats(res.data))
        .catch(() => setAxiosErrs('Could not load preview!')); // TODO: handle
    })();
    dispatch(getPosts());
  }, [dispatch])
  
  return (
    <div className='splash-main-container'>
      <div className='hero-container'>
        <p>Recipes</p>
        <p>Beans</p>
        <p>Cafes</p>
      </div>
      <div className='cats-grid-container'>
        { axiosErrs ? (
          <div>{ axiosErrs }</div>
        ) : cats && cats.map(c => (
            <div className='cat-preview'>
              <img className='prev-img' src={c.img_url} alt='preview of category'/>
              <div className='preview-title'>{c.name}</div>
            </div>
          ))
        }
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
