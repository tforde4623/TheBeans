import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/comments';

const AddCommentForm = ({ post, scroll }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [contentErr, setContentErr] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postComment({ content }, post.id))
      .then(res => {
        if (res.errors) {
          if ('content' in res.errors[0]) {
            setContentErr(res.errors[0].content);
          }
        }


        scroll();
      })

    setContent('');
  };

  const handleChange = val => {
    setContent(val);
    setContentErr(null);
  };

  return (
    <div className='comment-create-container'>
      <form className='create-comment-form'>
        <textarea 
          value={content} 
          placeholder={contentErr ? 'Content required...' : 'Add a comment...'}
          className={`${contentErr && 'input-err'} create-comment-content`}
          onChange={e => handleChange(e.target.value)}/>
        <button 
          className={`${contentErr && 'input-err'} create-comment-submit`}
          style={ contentErr && {'backgroundColor': '#fff0f4'} }
          onClick={e => handleSubmit(e)}
        >
          <i className="fas fa-share"></i>
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
