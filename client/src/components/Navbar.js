import React from "react";

import { useLocation, Link } from "react-router-dom";

//css
import "./Navbar.style.css";

function Navbar(props) {
  const location = useLocation();

  // console.log(location.state.disableLogin);

  const disableLogin = location.state?.disableLogin
    ? location.state.disableLogin
    : false;

  return (
    <header className="navbar">
      <div className="all-container">
        <a href="/newsfeed" class="logo">
          fosha
        </a>

        <div className="buttons">
          {disableLogin ? (
            <a className="write-post-btn ctrl-btn" href="/post/compose">
              <span>Write post</span>
            </a>
          ) : (
            <a className="write-post-btn ctrl-btn" href="/signin">
              <span>Login</span>
            </a>
          )}

          <Link to="/signin">
            <img
              src={process.env.PUBLIC_URL + "/img/user/user.png"}
              style={{
                width: "24px",
                height: "24px",
                marginLeft: "1em",
                borderRadius: "50%",
              }}
            ></img>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
