import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavigatorComponent from './components/Navigator'
import HomeComponent from './components/smart/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <NavigatorComponent />
          <Switch>
            <Route exact path='/' component={HomeComponent}/>
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
