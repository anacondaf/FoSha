import React, { useState } from "react";
import { mdiArrowLeft } from "@mdi/js";
import { Icon } from "@mdi/react";
import axios from "axios";

import { Link, Redirect } from "react-router-dom";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

import "./signin.style.css";

//URL
import { API_URL } from "../../config/url";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //#region Snackbar

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const snackbarAction = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnackBar}>
        OK
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  //#endregion

  const signIn = async () => {
    try {
      let response = await axios({
        method: "POST",
        url: `${API_URL}/auth/signin`,
        data: {
          email,
          password,
        },
      });

      console.log(response);
      setSnackbarMessage(response.data.message);
      setAlertType("success");
      setSnackBarOpen(true);

      if (response.data.statusCode == 200) {
        setIsSignIn(true);
      }
    } catch (error) {
      console.log(error.response);
      setSnackbarMessage(error.response.data.message);
      setAlertType("error");
      setSnackBarOpen(true);
    }
  };

  return isSignIn ? (
    <Redirect to={{ pathname: "/newsfeed", state: { disableLogin: true } }} />
  ) : (
    <div className="Authenticate">
      <div className="wrapper">
        <Link to="/newsfeed" style={{ textDecoration: "none", color: "black" }}>
          <Icon path={mdiArrowLeft} size="24px" style={{ cursor: "pointer" }} />
        </Link>

        <div className="container">
          <h2>Sign in to Fosha</h2>
          <div className="social-auth">
            <button>
              <img
                src={process.env.PUBLIC_URL + "/img/social/google.png"}
              ></img>
            </button>

            <button>
              <img
                src={process.env.PUBLIC_URL + "/img/social/facebook.png"}
              ></img>
            </button>

            <button>
              <img
                src={process.env.PUBLIC_URL + "/img/social/github.png"}
              ></img>
            </button>
          </div>

          <hr className="divider" />

          <div className="sign-in">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="@email.com"
              type="text"
              value={email}
              onChange={onEmailChange}
            ></input>

            <span className="spacing"></span>

            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={onPasswordChange}
            ></input>

            <button className="signin-btn" onClick={signIn}>
              Sign in
            </button>
          </div>

          <span className="spacing"></span>

          <p style={{ color: "#757a82", fontSize: "12px" }}>
            Not a member? <a href="/signup">Sign up now</a>
          </p>
        </div>
      </div>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
        action={snackbarAction}
      >
        <Alert
          severity={alertType}
          onClose={handleCloseSnackBar}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignIn;
