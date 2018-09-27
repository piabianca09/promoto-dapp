import React, { Component } from 'react'
import {firebase} from './../../firebase.js'
import Login from './../dumb/Login'
import { Container, Row, Col } from 'reactstrap'
import { withRouter } from 'react-router-dom';

class LoginComponent extends Component {
    constructor (props) {
        super (props)
        this.state = { 
            email : '',
            password: ''
         }
         this.handleInput = this.handleInput.bind(this)
         this.handleLogin = this.handleLogin.bind(this)
    }

    handleInput(event) {
        const {id, value} = event.target 
        this.setState({[id]: value})
    }

    async handleLogin() {
        const email = this.state.email
        const password = this.state.password
        await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        this.props.history.push('/wallet')
    }

    render() { 
        return ( 
            <div>
                <Container>
                    <Row>
                        <Col xs="1" sm="2"></Col>
                        <Col xs="8" sm="8">
                            <span data-shadow-text="LOGIN" className="title">LOGIN</span>
                            <Login
                                values={this.state}
                                handleInput={this.handleInput}
                                handleLogin={this.handleLogin}
                            />
                        </Col>
                        <Col xs="1" sm="2"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
 
export default withRouter(LoginComponent);