import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

const Login = props => (
    <Form>
        <FormGroup>
            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
            <Input type="text" name="email" id="email" placeholder="something@idk.cool" onChange={props.handleInput} value={props.values.email || ''}/>
        </FormGroup>
        <FormGroup>
            <Label for="examplePassword" className="mr-sm-2">Password</Label>
            <Input type="password" name="password" id="password" placeholder="******" onChange={props.handleInput} value={props.values.password || ''}/>
        </FormGroup>   
        <div id="menu">
            <p><Button color='link' onClick={props.handleLogin}>Submit</Button></p>
        </div>
        <div style={{paddingTop:'5vh'}}>
            Not registered? <Link to='/register'> Create an account </Link>
        </div>
    </Form>
)

export default Login