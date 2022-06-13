import React from 'react'
const Book = ({book, handleBook, homepageBooks}) => {
  const image = book.imageLinks && book.imageLinks.thumbnail
  ? book.imageLinks.thumbnail
  : "";

  let shelf = "none";
  
    homepageBooks.forEach( e => {
      if(e.id === book.id){
        return shelf = e.shelf
      }
    })


    return (
        <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})`}}></div>
            <div className="book-shelf-changer">
              <select onChange = {(e)=> handleBook(book, e.target.value)} value={shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
      )
};

 
export default Book;

