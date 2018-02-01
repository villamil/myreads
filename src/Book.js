import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }
    
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.book.shelf} onChange={(e) => this.props.onChangeShelf(this.props.book, e)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                {this.props.book.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>
                ))}
            </div>
        );
    }
}

export default Book;