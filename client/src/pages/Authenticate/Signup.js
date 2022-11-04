import React, { useState } from "react";
import { mdiArrowLeft } from "@mdi/js";
import { Icon } from "@mdi/react";
import axios from "axios";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

import { Link, Redirect } from "react-router-dom";

import "./signup.style.css";

//URL
import { API_URL } from "../../config/url";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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

  const signUp = async () => {
    if (password === confirmPassword) {
      try {
        let response = await axios({
          method: "POST",
          url: `${API_URL}/auth/signup`,
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
          setIsSignUp(true);
        }
      } catch (error) {
        console.log(error.response);
        setSnackbarMessage(error.response.data.message);
        setAlertType("error");
        setSnackBarOpen(true);
      }
    } else {
      setSnackbarMessage("Password are not matching!");
      setSnackBarOpen(true);
    }
  };

  return isSignUp ? (
    <Redirect to={{ pathname: "/newsfeed", state: { disableLogin: true } }} />
  ) : (
    <div className="Authenticate">
      <div className="wrapper">
        <Link to="/newsfeed" style={{ textDecoration: "none", color: "black" }}>
          <Icon path={mdiArrowLeft} size="24px" style={{ cursor: "pointer" }} />
        </Link>

        <div className="container">
          <h2>Welcome to Fosha</h2>
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

          <div className="sign-up">
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

            <span className="spacing"></span>

            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              id="confirm_password"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            ></input>

            <button className="signup-btn" onClick={signUp}>
              Sign up
            </button>
          </div>

          <p
            style={{
              color: "#757a82",
              fontSize: "12px",
              marginTop: "1.5em",
            }}
          >
            Already member? <a href="/signin">Sign in now</a>
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

export default SignUp;
