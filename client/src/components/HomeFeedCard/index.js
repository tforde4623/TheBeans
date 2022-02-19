import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './homeFeedCard.css';

const HomeFeedCard = ({ post }) => {
  const [showExt, setShowExt] = useState(false);

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
      <div 
        className={showExt ? 'card-description border-bottom' : 'card-description'}
      >{ post.description }</div>
      {!showExt && <div 
        onClick={() => setShowExt(true)} 
        className="show-comments">Show {post.comments.length} Comments...</div>}
      {showExt &&
      <div className='content-container'>
        {post.comments && post.comments.map(comment => (
          <div className='comment'>
            <strong className='bold-username'>{comment.author.username}</strong> 
            <span className='comment-content'> {comment.content}</span>
          </div>
        ))}
      </div>
      }
      {showExt && <div 
        onClick={() => setShowExt(false)} 
        className={showExt ? 'show-comments border-top' : 'show-comments'}
        >Hide...</div>}
    </div>
  );
};

export default HomeFeedCard;
