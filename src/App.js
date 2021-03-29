
import React from "react";
import GlobalCovid from "./pages/GlobalCovidPage";
import CanadaCovidPage from "./pages/CanadaCovidPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/covid">
          <GlobalCovid />
        </Route>
        <Route path = "/covid/ca">
          <CanadaCovidPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
