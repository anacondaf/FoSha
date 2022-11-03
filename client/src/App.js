import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import custom pages
import Homepage from "./pages/Homepage";
import Newsfeed from "./pages/Newsfeed";
import WritePost from "./pages/WritePost";
import Readpost from "./pages/Readpost";
import SignIn from "./pages/Authenticate/SignIn";

//import custom component
import Navbar from "./components/Navbar";
import SignUp from "./pages/Authenticate/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/newsfeed">
          <Navbar />
          <Newsfeed />
        </Route>
        <Route path="/post/compose">
          <WritePost />
        </Route>
        <Route path="/view/:post_id">
          <Navbar />
          <Readpost />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
