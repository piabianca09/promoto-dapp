import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import {firebase, databaseCollection} from './../../firebase.js'

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
        console.log(email, password)
        await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    }

    render() { 
        return ( 
            <Container className="app-container">
                <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                    <h1 className="display-5">Login</h1>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                <Input type="text" name="email" id="email" placeholder="something@idk.cool" onChange={this.handleInput} value={this.state.email}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="secret" onChange={this.handleInput} value={this.state.password}/>
                            </FormGroup>   
                            <hr className="my-2" />
                            <Button block className="button1" onClick={this.handleLogin}>Submit</Button>
                        </Form>
                    </Col>
                    <Col xs="2" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
 
export default LoginComponent;