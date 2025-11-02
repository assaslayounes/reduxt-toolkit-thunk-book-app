import React from "react";

const BooksList = ({ isLoading, books, isLoggedIn, deleteBook, dispatch }) => {
  const BooksList =
    books.length > 0
      ? books.map((book) => {
          return (
            <li
              key={book.id}
              className="list-group-item d-flex  justify-content-between align-items-center"
            >
              <div>{book.title}</div>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary">
                  Read
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  disabled={!isLoggedIn}
                  onClick={() =>
                    dispatch(deleteBook(book))
                      .unwrap()
                      .then((originalPromiseResult) => {
                        console.log(originalPromiseResult);
                        //dispatch(getBooks())
                      })
                      .catch((rejectedValueOrSerializedError) => {
                        console.log(rejectedValueOrSerializedError);
                      })
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })
      : "There is no books available !";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "Loading..." : <ul className="list-group">{BooksList}</ul>}
    </div>
  );
};

export default BooksList;
