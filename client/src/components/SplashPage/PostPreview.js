import React from 'react';
import styled from 'styled-components'

const PostPreview = ({ post, handlePostClick }) => {
  const Container = styled.div`
    width: calc(28vw - 5vw);
    height: 22vh;
    flex: 0 0 auto;
    display: inline-block;
    margin: 10px 10px;
    margin-bottom: 30px;
  `;

  const CardImage = styled.img`
    width: calc(28vw - 5vw);
    height: 22vh;
    object-fit: cover;
  `;

  const CardTitle = styled.div`
    position: relative;
    bottom: 7vh;
    background-color: #282828;
    opacity: 0.8;
    color: white;
    padding: 15px;
  `;
  
  return (
    <Container
      key={post.id}
      onClick={() => handlePostClick(post)} 
      className='post-preview'
    >
      <CardImage className='post-prev-img' src={post.img_url} alt='preview of category'/>
      <CardTitle className='preview-title'>{post.shortenedTitle}</CardTitle>
      {/* TODO: would like to put rating here */}
    </Container>
  )
}

export default PostPreview;
