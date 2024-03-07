import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import React, { useEffect } from "react";

const Home = () => {
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  return <div>Home</div>;
};

export default Home;
