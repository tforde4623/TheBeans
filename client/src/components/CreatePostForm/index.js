import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FileDrop } from 'react-file-drop';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';
import axios from 'axios';
import './createPostForm.css';

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchErrors, setFetchErrors] = useState(null);

  const handleDrop = files => {
    setImgFile(files[0]);
    setImgPreview(URL.createObjectURL(files[0]));
  };

  const onDrop = useCallback(handleDrop, []);
  const { getRootProps, getInputProps} = useDropzone({ onDrop });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const imgData = new FormData();
    imgData.append('i', imgFile);
    imgData.append('title', title);
    imgData.append('description', description);
    imgData.append('user_id', userId);
    imgData.append('category_id', categoryId);

    dispatch(createPost(imgData))
      .then(res => {
        if (!res.errors) {
          // push to page where the category is
          //history.push('');
        }
        setFetchErrors(res.errors);
        setLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      axios.get('/api/categories/')
        .then(({ data }) => setCategories(data))
    })()
  }, []);

  return (
    <div className='create-post-container'>
      <ul>
        {fetchErrors && fetchErrors.map(err => (
          <li key={err}>{err}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='create-form-main'>
        <div { ...getRootProps()}>
          {imgPreview  
            ?  <img className='image-preview' src={imgPreview} alt='preview of upload'/>
            : <div className='file-drop-zone'>
              <i className="far fa-image fa-lg"></i>
              &nbsp;
              upload photo
                <input { ...getInputProps()}/>
              </div>
          }
        </div>
        <input 
          type='text' 
          className='create-form-input'
          placeholder='Title'
          name='title'
          value={title} 
          onChange={e => setTitle(e.target.value)} />
        <select
          className='create-form-select'
          name='categoryId'
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          <option>Category</option>
          { categories && categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
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
