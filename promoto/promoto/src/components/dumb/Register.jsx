import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom';

const Register = props => (
    <Form>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="firstName" className="mr-sm-2">First Name</Label>
            <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={props.handleInput} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="lastName" className="mr-sm-2">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={props.handleInput} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="email" className="mr-sm-2">Email</Label>
            <Input type="email" name="email" id="email" placeholder="something@email.com" onChange={props.handleInput} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2">Password</Label>
            <Input type="password" name="password" id="password" placeholder="******" onChange={props.handleInput} />
        </FormGroup>   
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleConfirmPassword" className="mr-sm-2">Confirm Password</Label>
            <Input type="password" name="confirm-password" id="confirmPassword" placeholder="******" onChange={props.handleInput} />
        </FormGroup>   
        <div id="menu">
            <p><a href="#" onClick={props.handleRegister}>Submit</a></p>
        </div>
        <div style={{paddingTop:'5vh'}}>
            Already have an account? <Link to='/login'> Login </Link>
        </div>
    </Form>
)

export default Register