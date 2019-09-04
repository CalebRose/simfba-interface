import React from "react";
import Jumbotron from "./Jumbotron/jumbotron";
import Body from "./Body/body";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <Jumbotron />
      <Body />
    </div>
  );
};

export default LandingPage;
