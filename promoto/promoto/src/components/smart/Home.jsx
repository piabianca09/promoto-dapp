import React, { Component } from 'react';
import {firebase, databaseCollection} from './../../firebase.js'
import {Button} from 'reactstrap'

class HomeComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {  }
        this.test = this.test.bind(this)
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

    test() {
        console.log(this.state.user)
    }
    render() { 
        return ( 
            <div>
                This is home
                <Button onClick={this.test}> Test </Button>
            </div>
         );
    }
}
 
export default HomeComponent;
