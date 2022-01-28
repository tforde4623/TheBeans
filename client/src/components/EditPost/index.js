import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { putPost } from '../../store/posts';
import './editPost.css';

const EditForm = ({ post, setShow, setIsOpen }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [titleErrs, setTitleErrs] = useState();
  const [descErrs, setDescErrs] = useState();

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(putPost({
      id: post.id,
      title,
      description
    })).then(res => {
      if (res.errors) {
        res.errors.forEach(err => {
          if ('description' in err) {
            setDescErrs(err.description);
          } else if ('title' in err) {
            setTitleErrs(err.title);
          }
        });
      } else {
        setShow(false);
        setIsOpen(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        className={`${titleErrs && 'input-err'} edit-form-input`}
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title' 
        type='text' />
      {titleErrs && <div className='form-err-msg'>{titleErrs}</div>}
      <textarea
        className={`${descErrs && 'input-err'} edit-form-textarea`}
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      {descErrs && <div className='form-err-msg'>{descErrs}</div>}
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
