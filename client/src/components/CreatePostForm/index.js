import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';
import './createPostForm.css';

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchErrors, setFetchErrors] = useState(null);

  const handleDrop = files => {
    setImgFile(files[0]);
    setImgPreview(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // show loading indicator
    const imgData = new FormData();
    imgData.append('i', imgFile);
    imgData.append('title', title)
    imgData.append('description', description)
    imgData.append('user_id', userId)

    dispatch(createPost(imgData))
      .then(res => {
        if (res.errors) {
          setFetchErrors(res.errors);
        } else {
          // no errors (and get rid of loading indicator)
          setLoading(false);
        }
      });
  };

  return (
    <div className='create-post-container'>
      <ul>
        {fetchErrors && fetchErrors.map(err => (
          <li key={err}>{err}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='create-form-main'>
        <FileDrop  onDrop={files => handleDrop(files)}>
          {imgPreview  
            ?  <img className='image-preview' src={imgPreview} alt='preview of upload'/>
            : <div className='file-drop-zone'>
              <i className="far fa-image fa-lg"></i>
              &nbsp;
              upload photo
              </div> 
          }
        </FileDrop>
        <input 
          type='text' 
          className='create-form-input'
          placeholder='Title'
          name='title'
          value={title} 
          onChange={e => setTitle(e.target.value)} />
        <textarea 
          type='text' 
          className='create-form-input form-textarea'
          placeholder='Description/Recipe'
          name='description'
          value={description} 
          onChange={e => setDescription(e.target.value)} />
        {/* img upload form */}
        {/* if image is there preview it */}
        {loading &&
          <div>
            Uploading Image...
          </div>
        }
        <button className='create-submit-btn'>Create Post</button>
      </form>
    </div>
  )
};

export default CreatePostForm;
