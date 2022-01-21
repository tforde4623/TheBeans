import React, { useState } from 'react';
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

  const handleFileChange = e => {
    e.preventDefault();
    setImgFile(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
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
        <button>Create Post</button>
        {/* img upload form */}
        {/* if image is there preview it */}
        {imgPreview && <img className='image-preview' src={imgPreview} alt='preview of upload'/>}
        {loading &&
          <div>
            Uploading Image...
          </div>
        }
        {!imgPreview &&
          <label>
            <input type='file' onChange={handleFileChange}/>
          </label>
        }
        {imgPreview &&
          <button>Upload Img</button>
        }
      </form>
    </div>
  )
};

export default CreatePostForm;
