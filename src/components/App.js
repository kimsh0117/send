import React from 'react';
import { Helmet } from "react-helmet";
import { routes } from "lib/routes";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <>
    <Helmet
      htmlAttributes={{ lang: "en" }}
      meta={[
        {
          name: "description",
          content: "Sendsay test"
        }
      ]}
      title="Sendsay"
    />
    <Switch>
      {routes.map(({ path, page, exact }, i) => (
        <Route exact={exact} path={path} component={page} key={i} />
      ))}
    </Switch>
  </>
)

export default App;
