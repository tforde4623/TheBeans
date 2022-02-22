import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

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

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  useEffect(() => {
    debouncedFetchUsers(query, res => {
      setResults(res);
    });
  }, [query]);

  return (
    <div>
      <form>
        <input 
          onChange={e => setQuery(e.target.value)} 
          type='text'/>
        {results.map(res => <div>{res.username}</div>)}
      </form> 
    </div>
  )
}

export default UserSearch;
