import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import EthereumClient from './../../models/EthereumClient'
import { saveAs } from 'file-saver/FileSaver';

class CreateWalletComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            client: {}
        }
    }

    async generateWallet() {
        let client = new EthereumClient()
        await client.generateWallet()
        const { wallet } = client.wallet
        const encrypted = await client.encryptWallet(wallet, 'test')
        console.log(encrypted);
        client = {...client, wallet}
        this.setState({ client })
        sessionStorage.setItem('jsonwallet', encrypted)
        const currentSession = sessionStorage.getItem('jsonwallet')
        const blob = new Blob([currentSession], { type: "application/json" });
        saveAs(blob, "jsonwallet.json")
    }

    render() { 
        return ( 
            <Container className="app-container">
                <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                    <h1 className="display-5">Create Wallet</h1>
                        <Form>
                            <FormGroup>
                                <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="secret" />
                            </FormGroup>   
                            <hr className="my-2" />
                            <Button block className="button1" onClick={() => this.generateWallet()}>Submit</Button>
                        </Form>
                    </Col>
                    <Col xs="2" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
 
export default CreateWalletComponent;