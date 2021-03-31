
import React from "react";
import GlobalCovid from "./pages/GlobalCovidPage";
import CanadaCovidPage from "./pages/CanadaCovidPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/covid" />
        <Route path="/covid" component={GlobalCovid} />
        <Route path = "/covid/ca" component={CanadaCovidPage} />
      </Switch>
    </Router>
  );
}

export default App;
