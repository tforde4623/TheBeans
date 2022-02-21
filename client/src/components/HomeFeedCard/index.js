import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import { postLike, deleteLike } from '../../store/likes';
import './homeFeedCard.css';

const HomeFeedCard = ({ post, likes }) => {
  const dispatch = useDispatch();
  const [showExt, setShowExt] = useState(false);
  const currUserId = useSelector(state => state.session.user.id);
  const currLikes = likes.filter(like => like.user_id === currUserId);
  const isLiked = currLikes.length > 0;

  const changeLike = () => {
    if (!isLiked) {
      dispatch(postLike({user_id: currUserId, post_id: post.id})); 
    } else {
      dispatch(deleteLike(currLikes[0].id));
    }
  };

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
      {/* likes group */}
      <div>
        <div className='likes-counter'>
          {isLiked ? 
            <FontAwesomeIcon className='inline' onClick={changeLike} icon={faHeart} /> :
            <FontAwesomeIcon className='inline' onClick={changeLike} icon={farHeart} />
          }
          &nbsp; { likes.length } Likes
        </div>
      </div>
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
