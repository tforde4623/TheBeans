import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import './navBar.css';

const Navbar = styled.ul`
  background-color: rgba(107, 112, 92, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  z-index: 100;
  clear: both;
`;

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useSelector(state => state.session.user) || null;

  return (
    <nav>
      <Navbar>
        <li>
          <NavLink className='nav-title' to='/' exact={true}>
            <h1 className='nav-header'>TheBeans</h1>
          </NavLink>
        </li>
        <div className='nav-section'>
        {!user && 
          <li className='nav-item'>
            <NavLink className='nav-link' to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
        }
        {!user && 
          <li className='nav-item'>
            <NavLink className='nav-link' to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        }
        { user &&
          <p>
            <NavLink to='/' exact={true} activeClassName='active'>
              <i className="fas fa-home fa-lg"></i>
            </NavLink>
          </p>
          }
          {/* user drop down btn */}
          {user &&
            <p 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className='nav-user-dropdown'>
              <i className="fas fa-user"></i>
            </p>
          }

          {/* user drop down menu */}
          {showUserMenu &&
            <ul onClick={() => setShowUserMenu(false)} className='nav-user-menu'>
              <li className='user-nav-item'>
                <NavLink className='nav-menu-link' to={`/users/${user.id}/posts`}>
                  My Profile
                </NavLink>
              </li>
              <li>
                <LogoutButton setShowUserMenu={setShowUserMenu} />
              </li>
            </ul>
          }

          {user &&
            <p>
              <NavLink to='/chat'>
                <i className="fas fa-envelope fa-lg"></i>
              </NavLink>
            </p>
          }

          {user &&
            <p>
              <NavLink to='/posts/new'>
                <i className="fas fa-plus fa-lg"></i>
              </NavLink>
            </p>
          }
        </div>
      </Navbar>
    </nav>
  );
}

export default NavBar;
