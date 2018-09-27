import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Container, Row, Col, FormText, InputGroup,
    InputGroupAddon } from 'reactstrap'
import EthereumClient from './../../models/EthereumClient'
import { saveAs } from 'file-saver/FileSaver'

class CreateWalletComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            client: {}
        }
        this.onUpload = this.onUpload.bind(this)
        this.decryptWallet = this.decryptWallet.bind(this)
        // this.getBalance = this.getBalance.bind(this)
        this.generateWallet = this.generateWallet.bind(this)
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
        const blob = new Blob([currentSession], { type: "application/json" })
        saveAs(blob, "jsonwallet.json")
    }

    onUpload (event) {
        const files = event.target.files
        const reader = new FileReader()
        if (files.length) {
            const file = files[0]
            reader.readAsText(file)
        }
        reader.onload = () => {
            const result = reader.result
            sessionStorage.setItem("jsonwallet", result)
        }
    }

    async decryptWallet () {
        const jsonwallet = sessionStorage.getItem("jsonwallet")
        let client = new EthereumClient()
        const decryptedWallet = await client.decryptWallet(jsonwallet, 'test')
        this.setState({decryptedWallet})
    }   
    
    // async getBalance () {
    //     const wallet = new Wallet()
    //     const balance = await wallet.getBalance(this.state.decryptedWallet.address)
    //     this.setState({balance})
    // }

    render() { 
        return ( 
            <div>
                <Container className="app-container">
                    <Row>
                        <Col xs="2" sm="2"></Col>
                        <Col xs="8" sm="8">
                            <h1 className="display-5">Create Wallet</h1>

                            <InputGroup>
                                <Input type="password" name="password" id="examplePassword" placeholder="password" />
                                <InputGroupAddon addonType="prepend">
                                    <Button block className="button1" onClick={this.generateWallet}>CREATE WALLET</Button>
                                </InputGroupAddon>
                            </InputGroup>

                            {/* <Form>
                                <FormGroup>
                                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="secret" />
                                </FormGroup>   
                                <hr className="my-2" />
                                <Button block className="button1" onClick={this.generateWallet}>CREATE WALLET</Button>
                            </Form> */}
                        </Col>
                        <Col xs="2" sm="2"></Col>
                    </Row>
                </Container>
                <hr className="center-hr"/>
                <Container className="app-container">
                    <Row>
                        <Col xs="2" sm="2"></Col>
                        <Col xs="8" sm="8">
                        <h1 className="display-5">View Wallet</h1>
                            <Form>
                                <FormGroup>
                                    <Input type="file" name="file" id="exampleFile" onChange={this.onUpload}/>
                                    <FormText color="muted">
                                        Upload your json file here..
                                    </FormText>
                                </FormGroup>
                                <hr className="my-2" />
                                <h1>{this.state.balance}</h1>
                                <Button block className="button1" onClick={this.decryptWallet}>View Wallet</Button>
                            </Form>
                        </Col>
                        <Col xs="2" sm="2"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
 
export default CreateWalletComponent;