import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
} from "react-router-dom";
import { ActionSection } from "./action-section";
import { ListSection } from "./list-section";

const Root: React.FC<any> = (props) => {
  const fetchTasks = async () => {
    return await (await fetch(`${props.wfApiUrl}/user/tasks`)).json();
  };

  const refreshTasks = async () => {
    fetchTasks().then((result) => {
      if (typeof result !== "undefined") {
        getGlobalStore().setTasks(result);
      }
    });
  };
  
  return (
    <Router>
      <Switch>
        <Route exact path="/workflow">
          <ListSection {...props} />
        </Route>
        <Route path="/workflow/:id?">
          <ActionSection {...props}/>
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;
