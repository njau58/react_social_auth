import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutInitiate } from "../../Redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = () => {
    if (authToken) {
      dispatch(logoutInitiate());
    }
  };

  return (
    <div>
      <h2>Welcome {currentUser ? currentUser : null}</h2>
      <br></br>

      <button onClick={handleSubmit} type="button" className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Home;
