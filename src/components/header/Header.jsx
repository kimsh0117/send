import React from 'react';
import { withRouter } from 'react-router-dom';
import { Responsive } from "components/common";
import { logo } from 'assets/img'
import "./Header.scss";

const Header = () => (
  <Responsive>
    <header>
      <img src={logo} alt="logo" width="230" height="60"/>
    </header>
  </Responsive>
)

export default withRouter(Header);