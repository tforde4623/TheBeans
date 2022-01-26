import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/comments';

const AddCommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postComment({ content }, post.id));
    setContent('');
  };

  return (
    <div className='comment-create-container'>
      <form className='create-comment-form'>
        <textarea 
          value={content} 
          placeholder='Add a comment...'
          className='create-comment-content'
          onChange={e => setContent(e.target.value)}/>
        <button 
          className='create-comment-submit'
          onClick={e => handleSubmit(e)}
        >
          <i className="fas fa-share"></i>
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
