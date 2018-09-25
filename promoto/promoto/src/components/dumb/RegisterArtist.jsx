import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';


class RegisterArtistComponent extends Component {
    state = {  }

    render() {  
        const types = ['Singer','Painter', 'Musician', 'Sculptures', 'Photography', 'Architecture', 'Fashion Design', 'Crafts', 'Interior Design', 'Dancer', 'Musician']
        return ( 
            <Container className="app-container">
                <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                        <h1 className="display-5">Be an artist</h1>
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="exampleName" className="mr-sm-2">Username</Label>
                                <Input type="text" name="name" id="exampleName"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Type</Label>
                                <Input type="select" name="type" id="exampleSelect">
                                    {
                                        types.map(t => <option>{t}</option>)
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Description</Label>
                                <Input type="textarea" name="text" id="exampleText" className="textarea-desc"/>
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

export default RegisterArtistComponent;