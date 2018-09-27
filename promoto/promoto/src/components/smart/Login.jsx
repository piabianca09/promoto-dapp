import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import {firebase} from './../../firebase.js'
import { withRouter, Link } from 'react-router-dom';

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
        this.props.history.push('/')
    }

    render() { 
        return ( 
            <div>
                <Container>
                    <Row>
                        <Col xs="1" sm="2"></Col>
                        <Col xs="8" sm="8">
                            <span data-shadow-text="LOGIN" className="title">LOGIN</span>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                    <Input type="text" name="email" id="email" placeholder="something@idk.cool" onChange={this.handleInput} value={this.state.email}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="******" onChange={this.handleInput} value={this.state.password}/>
                                </FormGroup>   
                                <div id="menu">
                                    <p><a href="#" onClick={this.handleLogin}>Submit</a></p>
                                </div>
                                <div>
                                    Not registered? <Link to='/register'> Create an account </Link>
                                </div>
                            </Form>
                        </Col>
                        <Col xs="1" sm="2"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
 
export default withRouter(LoginComponent);