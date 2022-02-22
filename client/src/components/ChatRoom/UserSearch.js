import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

const fetchUsers = async (query, cb) => {
  const plusQuery = query.replace(/ /g, "+");
  const res = await fetch(`/api/users/search/${plusQuery}`);
  const json = await res.json();
  cb(json)
}; 

const debouncedFetchUsers = debounce((query, cb) => {
  fetchUsers(query, cb);
}, 1000);

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  useEffect(() => {
    debouncedFetchUsers(query, res => {
      setResults(res);
    });
    console.log(results)
  }, [query]);

  return (
    <div>
      <form>
        <input 
          style={{'margin-top': '100px'}}
          onChange={e => setQuery(e.target.value)} 
          type='text'/>
        {results.map(res => <div>{res.username}</div>)}
      </form> 
    </div>
  )
}

export default UserSearch;
