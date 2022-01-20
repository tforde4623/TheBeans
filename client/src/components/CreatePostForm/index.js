import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/posts';

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const data = dispatch(createPost({
      title,
      description,
      imgUrl,
      userId,
      imgFile
    }));

    if (data.errors) {
      // render those errors
      console.log('errors occured in validation');
    } else {
      // redirect somewhere
      console.log('success');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input 
          type='text' 
          value={title} 
          onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Description
        <input 
          type='text' 
          value={description} 
          onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Image Url
        <input 
          type='text' 
          value={imgUrl} 
          onChange={e => setImgUrl(e.target.value)} />
      </label>
      <label>
        Testing Img Upload
        <input type='file' onChange={e => setImgFile(e.target.files[0])}/>
      </label>
      <button>Create Post</button>
    </form>
  )
};

export default CreatePostForm;
