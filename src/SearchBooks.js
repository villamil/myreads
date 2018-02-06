import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShearchBooks extends Component {
    
    componentWillUnmount() {
        this.props.handleSearchInput.cancel();
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(e) => this.props.handleSearchInput(e.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    </ol>
                </div>
            </div>
        );
    }
}

export default ShearchBooks;