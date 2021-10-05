import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const authToken = useSelector((state) => state.user.token);
  return authToken ? (
    <Route {...rest}></Route>
  ) : (
    <LoadingToRedirect></LoadingToRedirect>
  );
};

export default AuthenticatedRoute;
