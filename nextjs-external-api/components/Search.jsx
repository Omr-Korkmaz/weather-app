import React, { useState } from 'react'

const Search = () => {

    const [searchWord, setSearchWord] = useState("")


const onChange = (event)=>{
const {value} = event.target;
setSearchWord(value)

}

console.log(searchWord)


  return (
    <div>

<input type="text" onChange={onChange} value={searchWord} />


    </div>
  )
}

export default Search