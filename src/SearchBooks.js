import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import { debounce } from 'lodash';
import * as BooksAPI from './BooksAPI';

class ShearchBooks extends Component {
    state = {
        searchBooks: []
    }
    componentWillUnmount() {
        this.handleSearchInput.cancel();
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired,
    }

    // followed this video https://www.youtube.com/watch?v=KXao_qwl05k to make the debounce work
    handleSearchInput = debounce(async (query) => {
        const result = await BooksAPI.search(query);
        const searchBooks = result.map((book) => {
            const fil = this.props.books.filter((b) => b.id === book.id);
            if (fil.length > 0) {
                book.shelf = fil[0].shelf
            }
            return book;
        });
        this.setState({ searchBooks });
    }, 500);

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleSearchInput(e.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooks.map((book) => (
                            <li key={book.id}><Book book={book} onChangeShelf={this.props.updateShelf} /></li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default ShearchBooks;