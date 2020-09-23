import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ActionSection } from "./action-section";
import { ListSection } from "./list-section";

const Root: React.FC<any> = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/workflow">
          <ListSection {...props} />
        </Route>
        <Route path="/workflow/:id?">
          <ActionSection {...props} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
