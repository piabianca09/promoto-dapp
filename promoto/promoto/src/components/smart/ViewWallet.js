import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col, FormText } from 'reactstrap';

class ViewWalletComponent extends Component {
    state = {  }
    render() { 
        return ( 
            <Container className="app-container">
                <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                    <h1 className="display-5">View Wallet</h1>
                        <Form>
                            <FormGroup>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Upload your json file here..
                                </FormText>
                            </FormGroup>
                            <hr className="my-2" />
                            <Button block className="button1" >Submit</Button>
                        </Form>
                    </Col>
                    <Col xs="2" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
 
export default ViewWalletComponent;