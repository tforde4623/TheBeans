import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './authForms.css';

const LoginForm = () => {
  const [errors, setErrors] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrs, setEmailErrs] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrs, setPasswordErrs] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = e => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(data => {
        if (data?.errors) {
          data.errors.forEach(err => {
            if (err.email) {
              setEmailErrs(err.email);
            } else if (err.password) {
              setPasswordErrs(err.password);
            } else if (err.csrf) {
              setErrors('Token is invalid.');
            }
          });
        }
      })
      .catch(() => {
        setErrors('Could not process request as sent');
      })
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='auth-form-container' onSubmit={onLogin}>
      <div>
        <input
          name='email'
          type='text'
          className={`auth-form-field ${emailErrs && 'auth-input-err'}`}
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      {emailErrs && <div className='auth-div-error'>{emailErrs}</div>}
      <div>
        <input
          name='password'
          className={`auth-form-field ${emailErrs && 'auth-input-err'}`}
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        {emailErrs && <div className='auth-div-error'>{passwordErrs}</div>}
        {errors && <div className='auth-div-error'>{errors}</div>}
        <button className='auth-form-submit' type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
