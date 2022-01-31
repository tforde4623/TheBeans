import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const PageNotFound = () => {
  return (
    <div className='error-container'>
      <h2 className='main-error'>
        404 
      </h2>
      <div>Oh no! We couldn't find what you are searching for!</div>
      <div>
        Go <NavLink to='/'>Home</NavLink>?
      </div> 
    </div>
  )
}

export default PageNotFound;
