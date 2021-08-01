import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import InnerLink from "components/utilities/InnerLink";


const Home = () => {
  /* ROUTING */
  const history = useHistory();

  useEffect(() => {
    history.push("/campaigns");
  }, []);

  return (
    <>
      <InnerLink to="/campaigns" primary="Campaign Maps" />
    </>
  );
};

export default Home;
