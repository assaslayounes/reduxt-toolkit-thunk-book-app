import React, { Fragment } from "react";

import Header from "./components/Header";
import Container from "./components/Container";
import AddForm from "./components/AddForm";
import BookContainer from "./components/Book/BookContainer";

const App = () => {
  /*  pass children props to Container , two choice
    1-  
      <Container>
        <AddForm />
        <BookContainer />
      </Container>
      
      2-
    
      <Container
        children={
          <>
            <AddForm />
            <BookContainer />
          </>
        }
      />
  */
  return (
    <Fragment>
      <Header />
      <Container>
        <AddForm />
        <BookContainer />
      </Container>
    </Fragment>
  );
};

export default App;
