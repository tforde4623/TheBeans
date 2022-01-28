import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import './navBar.css';

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useSelector(state => state.session.user) || null;

  return (
    <nav>
      <ul className='main-navbar'>
        <li>
          <NavLink className='nav-title' to='/' exact={true}>
            <h1 className='nav-header'>TheBeans</h1>
          </NavLink>
        </li>
        {!user && 
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
        }
        {!user && 
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        }

        <li className='nav-section'>
          <p>
            <NavLink to='/' exact={true} activeClassName='active'>
              <i className="fas fa-home fa-lg"></i>
            </NavLink>
          </p>
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
                <NavLink to={`/users/${user.id}/posts`}>
                  My Profile
                </NavLink>
              </li>
              <li>
                <LogoutButton setShowUserMenu={setShowUserMenu} />
              </li>
            </ul>
          }

          {/* TODO: plug button for adding post (if logged in) */}
          {user &&
            <p>
              <NavLink to='/posts/new'>
                <i className="fas fa-plus fa-lg"></i>
              </NavLink>
            </p>
          }
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
