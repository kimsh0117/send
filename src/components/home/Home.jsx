import React from "react";
import { Responsive } from "components/common";
import Sending from "./sending";
import Status from "./status";

import "./Home.scss";

const Home = ({ changeInput, validationCheck, valCheckMsg }) => (
  <Responsive>
    <Sending
      changeInput={changeInput}
      validationCheck={validationCheck}
      valCheckMsg={valCheckMsg}
    />
    <Status />
  </Responsive>
);

export default Home;
