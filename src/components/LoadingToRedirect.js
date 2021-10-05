import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);

  const history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push("/login");
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div>
      <p style={{marginTop:'200px'}}>Redirecting you in {count} seconds.</p>
    </div>
  );
};
export default LoadingToRedirect;
