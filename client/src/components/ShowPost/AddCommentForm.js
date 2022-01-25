import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/comments';

const AddCommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    console.log('wtf')
    e.preventDefault();
    dispatch(postComment({ content }, post.id));
  };

  return (
    <form>
      <input 
        value={content} 
        onChange={e => setContent(e.target.value)}/>
      <button onClick={e => handleSubmit(e)}>Comment</button>
    </form>
  );
};

export default AddCommentForm;
