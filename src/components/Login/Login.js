import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter, Link } from "react-router-dom";
import {
  googleSigninInitiate,
  loginInitiate,
  fbSigninInitiate
} from "../../Redux/actions";

import "./Login.css";

const Login = () => {

    const history = useHistory();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.user.loading);
  let emailError = useSelector((state) => state.user.emailError);
  let googleError = useSelector((state) => state.user.googleError);
  let fbError = useSelector((state) => state.user.fbError);
  const [state, setState] = useState({
    email: "",
    password: "",
    isDisabled:false,
    errorMessage:null,
    fbErrorr:fbError
  });

  const { email, password, isDisabled } = state;



 


  const handleGoogleSignIn = () => {

  
    dispatch(googleSigninInitiate());
  };
  const handleFaceBookSignIn = () => {
    dispatch(fbSigninInitiate());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setState({isDisabled:true})
    

    dispatch(loginInitiate(email, password));

    if (state.clearInputs) {
      setState({ email: "", password: "" });
    }
  };

  const resetPassword = () => {
    history.push("/resetPassword");
  };

  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (authToken) {
      history.push("/");
    }
  }, [authToken, history]);
  return (
    <div>
      <div id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit}>
          <p style={{ textAlign: "center" }} className="text-danger">
            {emailError}
            {googleError}
            {fbError}
          </p>
          <h1
            className="h3 mb-3 font-weight-normal"
            style={{ textAlign: "center", marginBottom: "25px" }}
          >
            Sign In
          </h1>
          <div className="social-login">
            <button 
              className="btn google-btn social-btn"
              onClick={handleGoogleSignIn}
              type="button"
            >
              <span>
                <i className="fa fa-google-plus" aria-hidden="true"></i> SignIn with
                Google+
              </span>
            </button>
            <button
              className="btn facebook-btn social-btn"
              onClick={handleFaceBookSignIn}
              type="button"
            >
              <span>
                <i className="fa fa-facebook" aria-hidden="true"></i> SignIn with
                FaceBook
              </span>
            </button>
          </div>
          <p style={{ textAlign: "center" }}>OR</p>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
            onChange={handleOnChange}
            required
            value={email}
          ></input>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
            required
            value={password}
          />
               <button
            onClick={resetPassword}
            style={{
              outline: "none",
              border: "none",
              marginTop: "1px",
              background: "none",
              cursor: "pointer",
              fontSize: "14px",
              color: "blue",
              marginRight:"250px"

            
            }}
          >
            Forgot password?
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-secondary btn-block"
            type="submit"
            disabled={isDisabled}
          
          >
            {loading ? (
              <i className="fa fa-spinner fa-spin fa-fw"></i>
            ) : (
              <i className="fa fa-sign-in" aria-hidden="true"></i>
            )}{" "}
            SignIn
          </button>

          <hr></hr>
          <p>Dont have an account ?</p>

          <Link to="/register">
            {" "}
            <button
              className="btn btn-primary btn-block"
              type="button"
              id="btn-signup"
            >
              <i className="fa fa-user" aria-hidden="true"></i> Register New
              Account
            </button>
          </Link>
     
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
