import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

class RegisterComponent extends Component {
    state = {  }
    render() { 
        return (  
            <Container className="app-container">
                <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                        <h1 className="display-5">Register</h1>
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="secret" />
                            </FormGroup>   
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="exampleConfirmPassword" className="mr-sm-2">Confirm Password</Label>
                                <Input type="password" name="confirm-password" id="exampleComfirmPassword" placeholder="secret" />
                            </FormGroup>   
                            <hr className="my-2" />
                            <Button block className="button1">Submit</Button>
                        </Form>
                    </Col>
                    <Col xs="2" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
 
export default RegisterComponent;