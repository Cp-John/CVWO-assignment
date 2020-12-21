import React from "react"
import { Route, Switch } from 'react-router-dom'
import Tasks from './Tasks'
import TaskInfo from "./TaskInfo";
import Header from "./Header";
import TaskAction from "./TaskAction"


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Tasks} />
          <Route exact path="/taskinfo/:id" component={TaskInfo} />
          <Route exact path="/task/new" component={TaskAction} />
          <Route exact path="/task/edit/:id" component={TaskAction} />
        </Switch>
      </div>
    );
  }
}

export default App
