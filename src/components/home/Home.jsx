import React from "react";
import { Responsive } from "components/common";
import Form from "./form";
import Status from "./status";
import Progress from "./progress";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  fileUploadClick,
  attaches,
  fileDelete,
  dropRef,
  dragging
}) => (
  <Responsive>
    <ToastContainer />
    <div className="home">
      {status === false ? (
        <Form
          changeInput={changeInput}
          validationCheck={validationCheck}
          valCheckMsg={valCheckMsg}
          checkAll={checkAll}
          send={send}
          fileUploadClick={fileUploadClick}
          attaches={attaches}
          fileDelete={fileDelete}
          dropRef={dropRef}
          dragging={dragging}
        />
      ) : (
        <Progress emailfor={emailfor} />
      )}
      <Status messages={messages} />
    </div>
  </Responsive>
);

export default Home;
