import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from '../../store/posts';
import EditPost from '../EditPost';
import './showPost.css';

// model for showing info / comments of an individual posts
const ShowPost = ({ post, setIsOpen }) => {
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.session.user.id);
  const [showEditForm, setShowEditForm] = useState();
  const owned =  currUser === post.user_id;

  const handleDelete = () => {
    dispatch(removePost(post.id));
    setIsOpen(false);
  };

  return (
    <div className='post-container'>
      {owned && 
        <button className='close-btn' 
          onClick={() => setIsOpen(false)}>
          <i class="fas fa-times"></i>
        </button>
      }
      <div className='post-container-left'>
        <img className='post-container-img' src={post.img_url} alt='main coffee stuff'/>
        { showEditForm ? [
          <EditPost post={post} setShow={setShowEditForm}/>
        ] : [
          <p className='post-container-content'>{ post.title }</p>,
          <hr/>,
          <p className='post-container-content'>{ post.description }</p>,
          <button onClick={() => setShowEditForm(!showEditForm)}>Edit</button>,
          <button onClick={handleDelete}>Delete</button>
        ]
         }
      </div>
      <div clasName='post-container-right'>
        hi
        {/* TODO: comments */}
      </div>
    </div>
  );
};

export default ShowPost;
