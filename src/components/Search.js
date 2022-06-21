import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book';
const Search = ({handleSearch, searchResult, updateShelf, homepageBooks, emptySearch}) => {
  
  
  const books = searchResult.map(book => <Book book = {book} key = {book.id} updateShelf = {updateShelf} homepageBooks= {homepageBooks}/>)
    return ( 
        <div className="search-books">
        <div className="search-books-bar">
          <Link to ='/'className="close-search" onClick = {emptySearch} >Close</Link>
          <div className="search-books-input-wrapper">
            <input 
            type="text" 
            placeholder="Search by title or author" 
            onKeyUp={(e)=>handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
     );
}
 
export default Search;