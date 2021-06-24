import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import InnerLink from "components/InnerLink";


const Home = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/campaigns");
  }, []);

  return (
    <>
      <InnerLink to="/campaigns" text="Campaign Maps" />
    </>
  );
};

export default Home;
