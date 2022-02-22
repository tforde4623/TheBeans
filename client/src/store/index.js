import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import postReducer from './posts';
import commentReducer from './comments';
import categoryReducer from './categories';
import likesReducer from './likes';
import roomReducer from './rooms';

const rootReducer = combineReducers({
  session,
  posts: postReducer,
  comments: commentReducer,
  categories: categoryReducer,
  likes: likesReducer,
  rooms: roomReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
