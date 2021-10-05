import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordInitiate } from "../../Redux/actions";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    isDisabled: false,
    errorMessage: null,
  });

  const { email, isDisabled, errorMessage } = state;

  let resetSuccess = useSelector((state) => state.user.resetSuccess);
  let error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPasswordInitiate(email));

    setState({ isDisabled: true, errorMessage: error });
  };

  return (
    <div>
      {resetSuccess ? (
        <div className="success-message">
          <div
            style={{ margin: "20px auto", width: "50%" }}
            className="alert alert-success"
            alert-hidden="true"
            role="alert"
          >
            Successful.Check your email for instructions.
          </div>
        </div>
      ) : null}

      <div id="register-form">
        <form className="form-signin" onSubmit="return false">
          <p style={{ textAlign: "center" }} className="h6" className="text-danger">
            {errorMessage}
          </p>
        
          <p style={{ fontSize: "14px" }}>
            Forgot your account’s password or having trouble logging into your
            Team? Enter your email address and we’ll send you a recovery link.
          </p>

          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
            onChange={handleOnChange}
            required
            value={email}
          />

          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
            type="submit"
          >
            {" "}
            Send recovery email
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

export default ForgotPassword;