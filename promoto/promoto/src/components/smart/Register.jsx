import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {firebase, databaseCollection} from './../../firebase.js'
import Register from './../dumb/Register'

class RegisterComponent extends Component {
    state = {  }
    constructor (props) {
        super(props)
        this.handleInput = this.handleInput.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleInput(event) {
        const {id, value} = event.target 
        this.setState({[id]: value})
    }
    async handleRegister() {
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword
        if (password === confirmPassword) {
            const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            let data = {
                firstName,
                lastName
            }
            await databaseCollection('users').doc(newUser.user.uid).set(data)
            this.props.history.push('/wallet')
        } else {
            console.log("Error")
        }
    }
    render() { 
        return (  
            <Container>
                <Row>
                    <Col xs="1" sm="2"></Col>
                    <Col xs="10" sm="8">
                        <span data-shadow-text="REGISTER" className="title">REGISTER</span>
                        <Register
                            values={this.state}
                            handleInput={this.handleInput}
                            handleRegister={this.handleRegister}
                        />
                    </Col>
                    <Col xs="1" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
 
export default withRouter(RegisterComponent);