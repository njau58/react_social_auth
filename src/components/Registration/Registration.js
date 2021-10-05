import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, withRouter } from "react-router-dom";
import { registerInitiate } from "../../Redux/actions";
import "./Registration.css";

const Registration = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
    errorMessage: "",
    createdAlert: false,
    isFlushed: false,
  });

  const { email, password, displayName, confirmPassword } = state;

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  let errorSignUp = useSelector((state) => state.user.registerError);
  const history = useHistory();

  if (currentUser) {
    errorSignUp = "";
  }
  useEffect(() => {
    if (currentUser) {
      setTimeout(() => history.push("/login"), 5000);
    }
  }, [currentUser, history]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setState({ errorMessage: "Password don't match!" });
      return;
    }

    dispatch(registerInitiate(email, password, displayName));

    if (state.clearInputs) {
      setState({
        email: "",
        password: "",
        confirmPassword: "",
        displayName: "",
        errorMessage: "",
      });
    }
  };

  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleOnChangeConfirm = (event) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      {currentUser ? (
        <div className="success-message">
          <div
            style={{ margin: "20px auto", width: "50%" }}
            className="alert alert-success"
            role="alert"
          >
            Account created Successfully.
          </div>
        </div>
      ) : null}

      <div id="register-form">
        <form className="form-signin" >
          <p style={{ textAlign: "center" }} className="h6 text-danger" >
            {errorSignUp}
          </p>
          <p style={{ textAlign: "center" }} className="h6 text-danger">
            {state.errorMessage}
          </p>
          <h1
            className="h3 mb-3 font-weight-normal"
            style={{ textAlign: "center", marginBottom: "25px" }}
          >
            Sign Up
          </h1>

          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="displayName"
            onChange={handleOnChange}
            required
            value={displayName}
            style={{ marginBottom: "10px" }}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
            onChange={handleOnChange}
            required
            value={email}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
            required
            value={password}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Repeat password"
            name="confirmPassword"
            onChange={handleOnChangeConfirm}
            required
            value={confirmPassword}
          />

          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
            type="submit"
          >
            {loading ? (
              <i className="fa fa-spinner fa-spin fa-fw"></i>
            ) : (
              <i className="fa fa-user-plus" aria-hidden="true"></i>
            )}
            SignUp
          </button>
          <Link to="/login">
            <span>
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </span>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Registration);
