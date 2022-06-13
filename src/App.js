import React, {useState, useEffect} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import Search from './components/Search'
import Shelf from './components/Shelf';
import {Link} from 'react-router-dom'

const BooksApp = () => {
  //Setting States of books array & query array
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState([]);

  useEffect(() => {
    BooksAPI.getAll()
    .then((resp) => {
      setBooks(resp)
    })
  }, []);


  //when the user updates a book from the homepage
  function handleShelf(selectedBook, shelf){
    // mapping through the books state to check which book is changed
    setBooks((prevState)=>{
      let newArray = prevState.map(book =>{
        if(book.id === selectedBook.id ){
          book.shelf = shelf;
        }
        return book
      })
      return newArray
    })
    //updating the api
    BooksAPI.update(selectedBook.id, shelf)
  }

  //Function To Add Book from the search page 
  function addBook (book, shelf){
    //adding a shelf property to the book
    book.shelf = shelf;
    //updating the api
    BooksAPI.update(book.id, shelf)
    //update the books state so the homepage rerenders 
    setBooks(prevBooks => [...prevBooks, book])
  }
  
  //Function to call api when user search for book
  function handleSearch (value){
    // A call to the api only when the value of search input is true
    value?
    //Searching through the api
    BooksAPI.search(value)
    .then((books) =>{
      //If the response is 
      books.length?
      setQuery(books) : setQuery([])
    }) :
    setQuery([])
  }
  function emptySearch(){
    setQuery([])
  }
  const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
  const wantToRead = books.filter(book => book.shelf === "wantToRead")
  const read = books.filter(book => book.shelf === "read")
  return (  
          <div className="app">
            <Route
            exact path = '/'
            render = {()=>(
              <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelf 
                  shelf = {currentlyReading} 
                  title = 'Currently Reading'
                  handleShelf = {handleShelf}
                  homepageBooks = {books}
                />
                <Shelf 
                  shelf = {wantToRead} 
                  title = 'Want To Read'
                  handleShelf = {handleShelf}
                  homepageBooks = {books}
                />
                <Shelf 
                  shelf = {read} 
                  title = 'Read'
                  handleShelf = {handleShelf}
                  homepageBooks = {books}
                />
              </div>
              <div className="open-search">
                <Link to ='/search'>Add a book</Link>
              </div>
            </div>
            )}
            /> 
            
          <Route
            exact path = '/search'
            render = {()=>(
              <Search 
              handleSearch = {handleSearch} 
              addBook={addBook}
              searchResult = {query}
              homepageBooks = {books}
              emptySearch = {emptySearch}
              />
            )}
          />
        </div>
  );
}
 
export default BooksApp;
 