import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { putComment } from '../../store/comments';

const EditComment = ({ comment, closeForm }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(comment.content);
  const [contentErrs, setContentErrs] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(putComment(content, comment.id))
      .then(res => {
        if (res.errors) {
          res.errors.forEach(err => {
            if ('content' in err) {
              setContentErrs(err.content);
            }
          });
        } else {
          closeForm(true);
        }
      });
  };

  return (
    <form className='edit-comment-form'>
      <textarea 
        className={`edit-c-form-ta ${contentErrs && 'input-err'}`}
        value={content} 
        onChange={e => setContent(e.target.value)}/>
      {contentErrs && <div className='form-err-msg'>{contentErrs}</div>}
      <button className='sp-edit-btn' onClick={e => handleSubmit(e)}>Confirm</button>
      <button className='sp-edit-btn' onClick={() => closeForm(false)}>Cancel</button>
    </form>
  );
};

export default EditComment;
