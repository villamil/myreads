import React, { Component } from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BooksList extends Component {

    static propTypes = {
        shelfs: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.props.shelfs.map((shelf) => (
                        <div key={shelf.id}>
                            <BookShelf shelfName={shelf.title} books={shelf.books} onChangeShelf={this.props.updateShelf} />
                        </div>
                    ))}
                </div>


                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BooksList;
