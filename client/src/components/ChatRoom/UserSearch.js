import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { postRoom } from '../../store/rooms';

// helper debounced fetch functions for user search reqs
const fetchUsers = async (query, cb) => {
  if (query.length > 0) {
    const plusQuery = query.replace(/ /g, "+");
    const res = await fetch(`/api/users/search/${plusQuery}`);
    const json = await res.json();
    cb(json)
  }
}; 

const debouncedFetchUsers = debounce((query, cb) => {
  fetchUsers(query, cb);
}, 150);


// actual component
const UserSearch = ({ 
  query, 
  setQuery, 
  showResults, 
  setShowResults 
}) => {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);

  const addConvo = val => {
    const userId = val;

    dispatch(postRoom(userId))
      .then(res => {
        if (!res.errors) {
          setShowResults(false);
        }
      })
  };

  useEffect(() => {
    debouncedFetchUsers(query, res => {
      setResults(res);
    });
  }, [query]);

  // TODO: clear the query when click off??
  return (
    <div>
      <form>
        <input 
          onClick={(e) => setShowResults(e, true)}
          placeholder='Search Users To Start Chatting...'
          onChange={e => setQuery(e.target.value)} 
          value={query}
          type='text'/>
        {showResults &&
          <div 
            onClick={(e) => setShowResults(e, true)} 
            className='search-results'>
            {results.map(res => (
              <div 
                onClick={() => addConvo(res.id)}
                className='search-result-row'
              >
                {res.username}
              </div>
            ))}
          </div>
        }
      </form> 
    </div>
  )
}

export default UserSearch;
