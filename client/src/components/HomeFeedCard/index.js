import React from 'react';

import './homeFeedCard.css';

const HomeFeedCard = ({ post }) => {
  return (
    <div className='card-container'>
      <div className='card-headline'>
        <div className='card-headline-item'>{ post.title }</div>
        <div className='card-headline-item'>{ post.author.username }</div>
      </div>
      {/* TODO: maybe we can put time in here? */}
      <img 
        className='main-feed-img'
        src={ post.img_url }
        alt='some coffee yumminess'/>
      <div>{ post.description }</div>
    </div>
  );
};

export default HomeFeedCard;
