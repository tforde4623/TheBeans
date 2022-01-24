import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import './navBar.css';

const NavBar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useSelector(state => state.session.user) || null;

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.main-navbar');

    if (window.scrollY <= 24) {
      navbar.style.backgroundColor = '#CB997E';
    } else {
      navbar.style.backgroundColor = '#6B705C';
    }
  });

  return (
    <nav>
      <ul className='main-navbar'>
        <li>
          <h1 className='nav-header'>TheBeans</h1>
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
            <ul className='nav-user-menu'>
              <li className='user-nav-item'>
                TODO: My Profile
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
