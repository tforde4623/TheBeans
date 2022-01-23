import React from 'react';
import { NavLink } from 'react-router-dom';

import './homeFeedCard.css';

const HomeFeedCard = ({ post }) => {
  return (
    <div className='card-container'>
      <div className='card-headline'>
        <div className='card-headline-item'>{ post.title }</div>
        <div className='card-headline-item'>
          <NavLink to={`/users/${post.author?.id}/posts/`}>
            @{ post.author?.username }
          </NavLink>
        </div>
      </div>
      {/* TODO: maybe we can put time in here? */}
      <img 
        className='main-feed-img'
        src={ post.img_url }
        alt='some coffee yumminess'/>
      <div className='card-description'>{ post.description }</div>
    </div>
  );
};

export default HomeFeedCard;
