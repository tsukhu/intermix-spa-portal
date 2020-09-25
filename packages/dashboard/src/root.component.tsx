import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ActionSection } from "./action-section";
import { HistoryActionSection } from "./history-action-section";
import { Workflows } from "./workflows";

const Root: React.FC<any> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/workflow">
          <Workflows {...props} />
        </Route>
        <Route path="/workflow/history/:id?">
          <HistoryActionSection {...props} />
        </Route>
        <Route path="/workflow/:id?">
          <ActionSection {...props} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
