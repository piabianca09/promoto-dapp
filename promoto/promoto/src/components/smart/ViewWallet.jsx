import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Container, Row, Col, FormText } from 'reactstrap'
import EthereumClient from './../../models/EthereumClient'
import Wallet from './../../models/Wallet'

class ViewWalletComponent extends Component {
    state = {  }
    constructor (props) {
        super(props)
        this.onUpload = this.onUpload.bind(this)
        this.decryptWallet = this.decryptWallet.bind(this)
        this.getBalance = this.getBalance.bind(this)
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
        console.log(decryptedWallet)
        this.setState({decryptedWallet})
    }   
    
    async getBalance () {
        const wallet = new Wallet()
        const balance = await wallet.getBalance(this.state.decryptedWallet.address)
        this.setState({balance})
    }

    render() { 
        return ( 
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
                            <Button block className="button1" onClick={this.decryptWallet}>Submit</Button>
                            <Button block className="button1" onClick={this.getBalance}>Get Balance</Button>
                        </Form>
                    </Col>
                    <Col xs="2" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}
 
export default ViewWalletComponent