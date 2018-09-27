import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import {firebase, databaseCollection} from './../../firebase.js'

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
            this.props.history.push('/create-wallet')
        } else {
            console.log("Error")
        }
    
    }
    render() { 
        return (  
            <Container>
                <Row>
                    <Col xs="1" sm="2"></Col>
                    <Col xs="8" sm="8">
                        <span data-shadow-text="REGISTER" className="title">REGISTER</span>
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="firstName" className="mr-sm-2">First Name</Label>
                                <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.handleInput} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="lastName" className="mr-sm-2">Last Name</Label>
                                <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.handleInput} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="email" className="mr-sm-2">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="something@email.com" onChange={this.handleInput} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="******" onChange={this.handleInput} />
                            </FormGroup>   
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="exampleConfirmPassword" className="mr-sm-2">Confirm Password</Label>
                                <Input type="password" name="confirm-password" id="confirmPassword" placeholder="******" onChange={this.handleInput} />
                            </FormGroup>   
                            <div id="menu">
                                <p><a href="#" onClick={this.handleRegister}>Submit</a></p>
                            </div>
                            <div>
                                Already have an account? <Link to='/login'> Login </Link>
                            </div>
                        </Form>
                    </Col>
                    <Col xs="1" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
 
export default withRouter(RegisterComponent);