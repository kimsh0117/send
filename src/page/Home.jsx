import React from "react";
import { FormContainer, SendingContainer } from "containers";
import { MainTemplate, Header } from "components";
import { Responsive } from "components/common";

import "./Home.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => (
  <MainTemplate header={<Header />}>
    <Responsive>
      <div className="home">
        <ToastContainer />
        <FormContainer />
        <SendingContainer />
      </div>
    </Responsive>
  </MainTemplate>
);

export default Home;
