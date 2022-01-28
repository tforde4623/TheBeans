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
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [showCommentEdit, setShowCommentEdit] = useState();
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

  const handleModalClick = () => {
    if (showPostMenu) {
      setShowPostMenu(false);
    }
    if (showCommentEdit) {
      setShowCommentEdit(null);
    }
  };

  return (
    <div onClick={() => handleModalClick()} className='post-container'>
      <button className='close-btn' 
        onClick={() => setIsOpen(false)}>
        <i  className="fas fa-times"></i>
      </button>
      <div className='post-container-left'>
        <img className='post-container-img' src={post.img_url} alt='main coffee stuff'/>
        { showEditForm ? [
          <EditPost setIsOpen={setIsOpen} post={post} setShow={setShowEditForm}/>
        ] : [
          <div className='post-title-container'>
            <p className='post-container-content'>{ post.title }</p>
            {showPostMenu && 
            <div className='showPost-menu'>
              <button 
                className='showPost-btn' 
                onClick={() => setShowEditForm(!showEditForm)}
              >Edit</button>
              <button 
                className='showPost-btn'
                onClick={handleDelete}
              >Delete</button>
            </div>}
            {owned && <i 
              style={{'color': 'black'}} 
              className="menu-hover fas fa-ellipsis-v" 
              onClick={() => setShowPostMenu(!showPostMenu)}></i>}
          </div>,
          <hr/>,
          <p className='post-container-content'>{ post.description }</p>,
        ]
         }
      </div>
      <div className='post-container-right'>
        <div className='comments-container'>
          <h3 className='comments-header'>Comments</h3>
          <AddCommentForm post={post}/>
          <div className='comments-scroll'>
          {comments && Object.values(comments).reverse().map(c => (
            <div 
              key={c.id}
              onClick={showCommentEdit ? () => setShowCommentEdit(false) : null} 
              className={commentEdit === c.id ? 'comment-div edit-comment-div' : 'comment-div'}>
            {commentEdit && commentEdit === c.id
              ?
                <EditComment 
                  comment={c} 
                  post={post} 
                  closeForm={setCommentEdit} />
              : [
                <div>
                  <div className='comment-user'>{c.author.username}</div>
                  <div>{c.content}</div>
                </div>,
                currUserId === c.author.id && !(showCommentEdit === c.id) && 
                  <i 
                    onClick={() => setShowCommentEdit(showCommentEdit === c.id ? false : c.id)}
                    className="menu-hover fas fa-ellipsis-h">
                  </i>,
                  c.id === showCommentEdit &&
                  <div 
                    className='comment-edit-menu'>
                    <button className='comment-btn' onClick={() => setCommentEdit(c.id)}>Edit</button>
                    <button className='comment-btn' onClick={() => commentDelete(c.id)}>Delete</button>
                  </div>
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
