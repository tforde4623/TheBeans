import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import CreatePostForm from './components/CreatePostForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomeFeed from './components/HomeFeed';
import SplashPage from './components/SplashPage';
import UserPage from './components/UserPage';
import Footer from './components/Footer';
import PageNotFound from './components/ErrorPages/PageNotFound';
import './index.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
        <NavBar />
        <div className='main-content'>
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path='/users' exact={true} >
              <UsersList/>
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute>
            <ProtectedRoute path='/posts/new'>
              <CreatePostForm />
            </ProtectedRoute>
            <ProtectedRoute path='/posts/:catId' exact={true} >
              <HomeFeed />
            </ProtectedRoute>
            <ProtectedRoute path='/' exact={true} >
              <SplashPage />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId/posts'>
              <UserPage />
            </ProtectedRoute>
            { /* 404 page */ }
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
