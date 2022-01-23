import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { putPost } from '../../store/posts';
import './editPost.css';

const EditForm = ({ post, setShow }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(putPost({
      id: post.id,
      title,
      description
    }))
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className='edit-form-input'
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title' 
        type='text' />
      <textarea
        className='edit-form-textarea'
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      <button className='edit-form-btn'>Done</button>
      <button 
        className='edit-form-btn' 
        onClick={() => setShow(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
