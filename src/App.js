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


  //when the user updates shelf from main page & from search page 
  const updateShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
    setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
    };
  
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
                  updateShelf = {updateShelf}
                  homepageBooks = {books}
                />
                <Shelf 
                  shelf = {wantToRead} 
                  title = 'Want To Read'
                  updateShelf = {updateShelf}
                  homepageBooks = {books}
                />
                <Shelf 
                  shelf = {read} 
                  title = 'Read'
                  updateShelf = {updateShelf}
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
              updateShelf={updateShelf}
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
 