import React from 'react';
import * as BooksAPI from './BooksAPI';
import BooksList from './BooksList';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import { debounce } from 'lodash';
import './App.css';


class BooksApp extends React.Component {
  state = {
    shelfs: [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: [],
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
        books: [],
      },
      {
        id: 'read',
        title: 'Read',
        books: [],
      },
    ]
  }

  async fetchAllBooks() {
    const books = await BooksAPI.getAll();
    const shelfs = this.state.shelfs.map((shelf) => {
      shelf.books = this.getShelfBooks(books, shelf.id)
      return shelf;
    })
    this.setState({ shelfs });
  }

  async componentDidMount() {
    this.fetchAllBooks();
  }

  updateShelf = async (book, e) => {
    await BooksAPI.update(book, e.target.value);
    this.fetchAllBooks();
  }

  getShelfBooks(books, shelf) {
    return books.filter((book) => book.shelf === shelf); // currentlyReading wantToRead read
  }

  handleSearchInput = debounce(async (query) => {
    const searchResult = await BooksAPI.search(query);
    console.log(searchResult);
  }, 500)

  render() {
    return (
      <div className="app">
        <Route
          path="/" exact render={() => (
            <BooksList
              shelfs={this.state.shelfs}
              updateShelf={this.updateShelf} />
          )}
        />
        <Route
          path="/search" exact render={() => (
            <SearchBooks
              shelfs={this.state.shelfs}
              updateShelf={this.updateShelf}
              handleSearchInput={this.handleSearchInput}
              />
          )}
        />
      </div>
    )
  }
}

export default BooksApp;
