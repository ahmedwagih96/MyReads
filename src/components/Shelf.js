import React from 'react'
import Book from './Book'
const Shelf = ({shelf, title, handleShelf, homepageBooks}) => {
    const books = shelf.map(book => <Book book = {book} key = {book.id} handleBook = {handleShelf} homepageBooks = {homepageBooks}/>)
    return ( 
        <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
     );
}
 
export default Shelf;