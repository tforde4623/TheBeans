import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  height: 22vh;
  display: inline-block;
  margin: 10px 5px;
  flex-grow: 1;
`;

const CardImage = styled.img`
  height: 22vh;
  object-fit: cover;
  width: 100%;
`;

const CardTitle = styled.div`
  position: relative;
  bottom: 7vh;
  background-color: #282828;
  opacity: 0.8;
  color: white;
  padding: 15px;
`;

const PostPreview = ({ post, handlePostClick }) => {
  
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
