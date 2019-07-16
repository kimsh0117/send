import React from "react";
import { Responsive } from "components/common";
import Form from "./form";
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
  messages,
  fileUploadClick
}) => (
    <Responsive>
      <div className="home">
        {status === false ? (
        <Form
          changeInput={changeInput}
          validationCheck={validationCheck}
          valCheckMsg={valCheckMsg}
          checkAll={checkAll}
          send={send}
          fileUploadClick={fileUploadClick}
        />) : <Progress emailfor={emailfor}/>}
        <Status
          messages={messages}
        />
      </div>
    </Responsive>
  );

export default Home;
