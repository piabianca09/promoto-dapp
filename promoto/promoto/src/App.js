import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavigatorComponent from './components/Navigator'
import HomeComponent from './components/smart/Home';
import LoginComponent from './components/dumb/Login';
import RegisterArtistComponent from './components/dumb/RegisterArtist';
import RegisterComponent from './components/dumb/Register';
import CreateWalletComponent from './components/smart/CreateWallet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <NavigatorComponent />
          <Switch>
            <Route exact path='/' component={HomeComponent}/>
            <Route path='/login' component={LoginComponent}/>
            <Route path='/register' component={RegisterComponent}/>
            <Route path='/register-artist' component={RegisterArtistComponent}/>
            <Route path='/create-wallet' component={CreateWalletComponent}/>
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
