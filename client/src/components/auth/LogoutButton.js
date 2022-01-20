import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({ setShowUserMenu }) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setShowUserMenu(false);
  };

  return (
    <p className='logout-btn' onClick={onLogout}>
      Logout
    </p>
  );
};

export default LogoutButton;
