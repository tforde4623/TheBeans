import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { putComment } from '../../store/comments';

const EditComment = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(comment.content);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(putComment(content, postId));
  };

  return (
    <form className='edit-comment-form'>
      <input 
        value={content} 
        onChange={e => setContent(e.target.value)}/>
      <button onClick={e => handleSubmit(e)}>Confirm</button>
    </form>
  );
};

export default EditComment;
