import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import MainPage from "./Components/MainPage";
import SearchPage from "./Components/SearchPage";

//you can avoid using constructor but it is not supported by javascript
//app component is the parent component
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  //added componentDidMount lifecycle event L4
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }
  //update state with setState(Lesson 3:State Management)
  bookUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(book)
      }));
    });
  };
  //Dynamically Render Pages (This method breaks the back button so we don't use it)L5 Managing App Location with React.
  // history-The BrowserRouter Component L5
  //Route- The Route Component works L5(Route is used.Use exact to get the correct path)
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} bookUpdate={this.bookUpdate} />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage books={this.state.books} bookUpdate={this.bookUpdate} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
