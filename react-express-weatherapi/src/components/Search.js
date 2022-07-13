import React, {useState} from 'react'

const Search = ({setLocation}) => {

      const [search, setSearch] = useState('');
    
      const onSubmit = (e) => {
        e.preventDefault();
        setLocation(search);
      };
      return (
        
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Search your location and hit Enter'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
     
      );
    }

export default Search