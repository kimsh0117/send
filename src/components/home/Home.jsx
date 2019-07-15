import React from "react";
import { Responsive } from "components/common";
import Sending from "./sending";
import Status from "./status";
import Progress from "./progress";

import "./Home.scss";

const Home = ({
  changeInput,
  validationCheck,
  valCheckMsg,
  checkAll,
  send,
  emailfor,
  status,
  messages
}) => (
    <Responsive>
      <div className="home">
        {status === false ? (
        <Sending
          changeInput={changeInput}
          validationCheck={validationCheck}
          valCheckMsg={valCheckMsg}
          checkAll={checkAll}
          send={send}
        />) : <Progress emailfor={emailfor}/>}
        <Status
          messages={messages}
        />
      </div>
    </Responsive>
  );

export default Home;
