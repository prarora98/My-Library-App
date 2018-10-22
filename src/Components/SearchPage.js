import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from ".././BooksAPI";

//search page component to search books
class SearchPage extends React.Component {
  state = {
    query: "",
    searchBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query });
    this.updateSearchResults(query);
  };
  updateSearchResults = query => {
    if (query) {
      BooksAPI.search(query).then(searchBooks => {
        if (searchBooks.error) {
          this.setState({ searchBooks: [] });
        } else {
          searchBooks.forEach(book => {
            let searchShelf = this.props.books.filter(B => B.id === book.id);
            if (searchShelf[0]) {
              book.shelf = searchShelf[0].shelf;
            }
          });
          this.setState({ searchBooks: searchBooks });
        }
      });
    } else if(query===undefined || query.length===0) {
      this.setState({ searchBooks: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map(searchBook => (
              <Book
                book={searchBook}
                key={searchBook.id}
                bookUpdate={this.props.bookUpdate}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;