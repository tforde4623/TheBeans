import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from '../../store/posts';
import { getPostComments, removeComment } from '../../store/comments';
import EditPost from '../EditPost';
import AddCommentForm from './AddCommentForm';
import EditComment from './EditComment';
import './showPost.css';

// model for showing info / comments of an individual posts
const ShowPost = ({ post, setIsOpen }) => {
  const dispatch = useDispatch();
  const currUserId = useSelector(state => state.session.user.id);
  const comments = useSelector(state => state.comments);
  const [showEditForm, setShowEditForm] = useState();
  const [commentEdit, setCommentEdit] = useState(null);
  const owned =  currUserId === post.user_id;

  useEffect(() => {
    dispatch(getPostComments(post.id));
  }, [dispatch, post.id])

  const handleDelete = () => {
    dispatch(removePost(post.id));
    setIsOpen(false);
  };

  const commentDelete = commentId => {
    dispatch(removeComment(commentId));
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
      <div className='post-container-right'>
        <div className='comments-container'>
          <h3 className='comments-header'>Comments</h3>
          <AddCommentForm post={post}/>
          <div className='comments-scroll'>
          {comments && Object.values(comments).reverse().map(c => (
            <div className='comment-div'>
            {commentEdit && commentEdit === c.id
              ?
                <EditComment comment={c} post={post} />
              : [
                <div className='comment-user'>{c.author.username}</div>,
                <div>{c.content}</div>,
                currUserId === c.author.id && 
                  <button onClick={() => setCommentEdit(c.id)}>Edit</button>,
                  <button onClick={() => commentDelete(c.id)}>Delete</button>
              ]
            }
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
