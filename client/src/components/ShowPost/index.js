import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from '../../store/posts';
import { getPostComments, removeComment } from '../../store/comments';
import EditPost from '../EditPost';
import AddCommentForm from './AddCommentForm';
import EditComment from './EditComment';
import './showPost.css';

const ShowPost = ({ post, setIsOpen }) => {
  const dispatch = useDispatch();
  const currUserId = useSelector(state => state.session.user.id);
  const comments = useSelector(state => state.comments);
  const [showEditForm, setShowEditForm] = useState();
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [showCommentEdit, setShowCommentEdit] = useState();
  const [commentEdit, setCommentEdit] = useState(null);
  const owned = currUserId === post.user_id;

  useEffect(() => {
    dispatch(getPostComments(post.id));
  }, [dispatch, post.id])

  const handleDelete = () => {
    dispatch(removePost(post.id));
    setIsOpen(false);
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
          <EditPost key={8} setIsOpen={setIsOpen} post={post} setShow={setShowEditForm}/>
        ] : [
          <div key={7} className='post-title-container'>
            <p key={6} className='post-container-content'>{ post.title }</p>
            {showPostMenu && 
            <div key={5} className='showPost-menu'>
              <button 
                key={4}
                className='showPost-btn' 
                onClick={() => setShowEditForm(!showEditForm)}
              >Edit</button>
              <button 
                key={3}
                className='showPost-btn'
                onClick={handleDelete}
              >Delete</button>
            </div>}
            {owned && <i 
              style={{'color': 'black'}} 
              key={2}
              className="menu-hover fas fa-ellipsis-v" 
              onClick={() => setShowPostMenu(!showPostMenu)}></i>}
          </div>,
          <hr key={1}/>,
          <p key={0} className='post-container-content'>{ post.description }</p>,
        ]
         }
      </div>
      <div className='post-container-right'>
        <div className='comments-container'>
          <h3 className='comments-header'>Comments</h3>
          <AddCommentForm post={post}/>
          <div className='comments-scroll'>
          {Object.values(comments) && Object.values(comments).reverse().map(c => (
            <div 
              key={c.id}
              onClick={showCommentEdit ? () => setShowCommentEdit(false) : null} 
              className={commentEdit === c.id ? 'comment-div edit-comment-div' : 'comment-div'}>
            {commentEdit && commentEdit === c.id
              ?
                <EditComment 
                  comment={c} 
                  post={post} 
                  key={c.id}
                  closeForm={setCommentEdit} />
              : [
                <div key={c.id}>
                  <div className='comment-user'>{c.author.username}</div>
                  <div>{c.content}</div>
                </div>,
                currUserId === c.author.id && !(showCommentEdit === c.id) && 
                  <i 
                    key={c.id * 2}
                    onClick={() => setShowCommentEdit(showCommentEdit === c.id ? false : c.id)}
                    className="menu-hover fas fa-ellipsis-h">
                  </i>,
                  c.id === showCommentEdit &&
                  <div 
                    key={c.id * 3}
                    className='comment-edit-menu'>
                    <button className='comment-btn' onClick={() => setCommentEdit(c.id)}>Edit</button>
                    <button className='comment-btn' onClick={() => dispatch(removeComment(c.id))}>Delete</button>
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
