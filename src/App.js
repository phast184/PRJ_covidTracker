import React from "react";
import GlobalCovid from "./pages/GlobalCovidPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/covid">
          <GlobalCovid />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
