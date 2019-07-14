import React from "react";
import { HomeContainer } from "containers";
import { MainTemplate, Header } from "components";

const Home = () => (
  <MainTemplate header={<Header />}>
    <HomeContainer />
  </MainTemplate>
);

export default Home;
