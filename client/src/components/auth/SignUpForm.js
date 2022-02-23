import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [usernameErrs, setUsernameErrs] = useState();
  const [emailErrs, setEmailErrs] = useState();
  const [passwordErrs, setPasswordErrs] = useState();
  const [passMatchErr, setPassMatchErr] = useState();

  const onSignUp = e => {
    e.preventDefault();
    if (!repeatPassword) setPassMatchErr('This field is required.');
    if (password === repeatPassword) {
      dispatch(signUp(username, email, password))
        .then(data => {
          if (data?.errors) {
            data.errors.forEach(err => {
              if (err.username) {
                setUsernameErrs(err.username);
              } else if (err.email) {
                setEmailErrs(err.email);
              } else if (err.password) {
                setPasswordErrs(err.password);
              }
            });
          }
        }) 
    } else {
      setPassMatchErr('Passwords do not match.');
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <form className='auth-form-container' onSubmit={onSignUp}>
        <div>
          <input
            type='text'
            placeholder='Username'
            className={`auth-form-field ${usernameErrs && 'auth-input-err'}`}
            name='Username'
            onChange={updateUsername}
            value={username}
          ></input>
          {usernameErrs && <div className='auth-div-error'>{usernameErrs}</div>}
        </div>
        <div>
          <input
            type='text'
            name='email'
            className={`auth-form-field ${emailErrs && 'auth-input-err'}`}
            placeholder='Email'
            onChange={updateEmail}
            value={email}
          ></input>
          {emailErrs && <div className='auth-div-error'>{emailErrs}</div>}
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className={`auth-form-field ${passwordErrs && 'auth-input-err'}`}
            onChange={updatePassword}
            value={password}
          ></input>
          {passwordErrs && <div className='auth-div-error'>{passwordErrs}</div>}
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            className={`auth-form-field ${passMatchErr && 'auth-input-err'}`}
            onChange={updateRepeatPassword}
            value={repeatPassword}
          ></input>
          {passMatchErr && <div className='auth-div-error'>{passMatchErr}</div>}
        </div>
        <button className='auth-form-btn' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
