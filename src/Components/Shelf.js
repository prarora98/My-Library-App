import React from "react";
import Book from "./Book";

class Shelf extends React.Component {
  // L3 Pass Data with Props()
  render() {
    const books = this.props.books;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title" style={{ color: "green" }}>
          {this.props.shelfname}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, key) => (
              <Book
                book={book}
                key={book.id}
                bookUpdate={this.props.bookUpdate}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Shelf;