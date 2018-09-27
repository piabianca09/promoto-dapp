import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import NavigatorComponent from './components/Navigator'
import HomeComponent from './components/smart/Home'
import LoginComponent from './components/smart/Login'
import RegisterArtistComponent from './components/smart/RegisterArtist'
import RegisterComponent from './components/smart/Register'
import WalletComponent from './components/smart/Wallet'
import UserRoute from './UserRoute'
import NonUserRoute from './NonUserRoute'
import {firebase} from './firebase.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { user:null } 
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
            this.setState({user}) 
        } else {
            this.setState({user:null})
        }
    })
  }
  

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            { this.state.user && <NavigatorComponent /> }
            <Switch>
              <NonUserRoute path='/login' component={LoginComponent} user={this.state.user}/>
              <NonUserRoute path='/register' component={RegisterComponent} user={this.state.user}/>
              <UserRoute exact path='/' component={HomeComponent} user={this.state.user}/>
              <UserRoute path='/register-artist' component={RegisterArtistComponent} user={this.state.user}/>
              <UserRoute path='/wallet' component={WalletComponent} user={this.state.user}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
