import React from "react"
import PropTypes from "prop-types"
import { Route, Switch } from 'react-router-dom'
import Task from './Task'
import Tasks from './Tasks'

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Tasks} />
        <Route exact path="/tasks/:id" component={Task} />
      </Switch>
    );
  }
}

export default App
