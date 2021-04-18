import React from "react";
import GlobalCovid from "./pages/GlobalCovidPage";
import CanadaCovidPage from "./pages/CanadaCovidPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//dev-q1yz-ouh.us.auth0.com
//f0ttBuAYqY8KkjeIoEfWp5xB2b9nHLvS
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <GlobalCovid />
        </Route>
        <Route path = "/ca">
          <CanadaCovidPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
