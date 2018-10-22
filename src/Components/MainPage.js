import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

// MainPage component where books are placed in shelves
class MainPage extends React.Component {
  render() {
    const books = this.props.books;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              bookUpdate={this.props.bookUpdate}
              books={books.filter(book => book.shelf === "currentlyReading")}
              shelfname="Currently Reading"
            />
            <Shelf
              bookUpdate={this.props.bookUpdate}
              books={books.filter(book => book.shelf === "wantToRead")}
              shelfname="Want To Read"
            />
            <Shelf
              bookUpdate={this.props.bookUpdate}
              books={books.filter(book => book.shelf === "read")}
              shelfname="Read"
            />
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainPage