import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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
  const [titleErr, setTitleErr] = useState('');
  const [descErr, setDescErr] = useState('');
  const [catErr, setCatErr] = useState('');
  const [imgErr, setImgErr] = useState('');

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
          history.push(`/posts/${categoryId}`);
        } else {
          console.log(res.errors);
          res.errors.forEach(err => {
            if (err.title) {
              setTitleErr(err.title);
            } else if (err.description) {
              setDescErr(err.description);
            } else if (err.category_id) {
              setCatErr(err.category_id);
            } else if (err.img) {
              setImgErr(err.img);
            }
          });
        }
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
        {imgErr && <div className='auth-div-error'>{imgErr}</div>}
        <input 
          type='text' 
          className={`create-form-input ${titleErr && 'input-err'}`}
          placeholder='Title'
          name='title'
          value={title} 
          onChange={e => setTitle(e.target.value)} />
        {titleErr && <div className='auth-div-error'>{titleErr}</div>}
        <select
          className={`create-form-select ${catErr && 'input-err'}`}
          name='categoryId'
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          { catErr ? <option>Category Required...</option> : <option>Category</option>}
          { categories && categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {catErr && <div className='auth-div-error'>{catErr}</div>}
        <textarea 
          type='text' 
          className={`create-form-input form-textarea ${descErr && 'input-err'}`}
          placeholder='Description/Recipe'
          name='description'
          value={description} 
          onChange={e => setDescription(e.target.value)} />
        {descErr && <div className='auth-div-error'>{descErr}</div>}
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
