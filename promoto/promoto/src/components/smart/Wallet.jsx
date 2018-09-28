import React, { Component } from 'react'
import { Button, Input, Container, Row, Col, FormText, InputGroup,
    InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import EthereumClient from './../../models/EthereumClient'
import { saveAs } from 'file-saver/FileSaver'
import { withRouter } from 'react-router-dom';
import Wallet from './../../models/Wallet'
import {firebase} from './../../firebase.js'
import {address, abi} from './../../config'
import {ethers, provider} from './../../helpers/ethers-config'


class CreateWalletComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            client: {},
            modal: false
        } 
        this.handleInput = this.handleInput.bind(this)
        this.onUpload = this.onUpload.bind(this)
        this.decryptWallet = this.decryptWallet.bind(this)
        this.walletInfo = this.walletInfo.bind(this)
        this.generateWallet = this.generateWallet.bind(this)
        this.showDiv = this.showDiv.bind(this)
        this.walletExist = this.walletExist.bind(this)
        this.toggle = this.toggle.bind(this);
        this.getPendingBalance = this.getPendingBalance.bind(this)
        this.withdrawBalance = this.withdrawBalance.bind(this)
        this.walletInfo = this.walletInfo.bind(this)
    }
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.setState({user}) 
                this.walletExist()
                if (sessionStorage.getItem("jsonwallet") != null) {
                    this.toggle()
                }
            } else {
                this.setState({user:null})
            }
        })
    }

    handleInput(event) {
        const {id, value} = event.target 
        this.setState({[id]: value})
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    async generateWallet() {
        let client = new EthereumClient()
        await client.generateWallet()
        const { wallet } = client.wallet
        const createPassword = this.state.createPassword
        const encrypted = await client.encryptWallet(wallet, createPassword)
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
        let openPassword = this.state.openPassword
        const decryptedWallet = await client.decryptWallet(jsonwallet, openPassword)
        this.setState({decryptedWallet})
        this.walletInfo()
        await this.getPendingBalance()
    }   
    
    async walletInfo () {
        this.showDiv()
        const wallet = new Wallet()
        const balance = await wallet.getBalance(this.state.decryptedWallet.address)
        this.setState({balance})
        const address = this.state.decryptedWallet.address
        this.setState({address})
    }

    async getPendingBalance() {
        let client = new EthereumClient()
        const jsonwallet = sessionStorage.getItem("jsonwallet")
        const walletPassword = this.state.openPassword
        console.log(walletPassword, 'walet')
        const decryptedWallet = await client.decryptWallet(jsonwallet, walletPassword)
        this.setState({decryptedWallet})
        const wallet = new ethers.Wallet(decryptedWallet.privateKey, provider)
        const contract = new ethers.Contract(address,abi,wallet)  
        const pendingBalance = await contract.checkBalance()
        const formatPendingBalance = ethers.utils.formatEther(pendingBalance)
        this.setState({formatPendingBalance})
    }

    async withdrawBalance() {
        let client = new EthereumClient()
        const jsonwallet = sessionStorage.getItem("jsonwallet")
        const walletPassword = this.state.openPassword
        console.log(walletPassword, 'walet')
        const decryptedWallet = await client.decryptWallet(jsonwallet, walletPassword)
        this.setState({decryptedWallet})
        const wallet = new ethers.Wallet(decryptedWallet.privateKey, provider)
        const contract = new ethers.Contract(address,abi,wallet)    
        const pendingBalance = await contract.cashOut()
        this.setState({formatPendingBalance: 0 })        
    }

    showDiv() {
        document.getElementById('balance-div').style.display = "block";
     }

    walletExist() {
        if (sessionStorage.getItem("jsonwallet") != null) {
            document.getElementById('balance-div').style.display = "block";
        }
    }

    render() { 
        return ( 
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div id="balance-div" style={{display:'none', borderLeft:'solid 5px', borderLeftColor:'#d57897', paddingLeft:'10px'}}>
                                <h1 className="display-4">Wallet</h1>    
                                <h6>{`Balance: ${this.state.balance}`}</h6>
                                <h6>{`Address: ${this.state.address}`}</h6>
                                {this.state.formatPendingBalance > 0 &&
                                    <div>
                                        <h6>{`Pending Balance: ${this.state.formatPendingBalance}`}</h6>
                                        <Button className="button1" style={{margin: '1vh'}} onClick={this.withdrawBalance}>Withdraw</Button>
                                    </div>
                                }   
                            </div> 
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="6">
                            <div className="app-container"> 
                                <h1 className="display-4">Create Wallet</h1>
                                <InputGroup>
                                    <Input type="password" name="createPassword" id="createPassword" placeholder="password" onChange={this.handleInput}/>
                                    <InputGroupAddon addonType="prepend">
                                        <Button block onClick={this.generateWallet}>GENERATE WALLET</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </Col>
                        <Col xs="12" md="6">
                            <div className="app-container">
                                <h1 className="display-4">View Wallet</h1>
                                <Input type="file" name="file" id="exampleFile" onChange={this.onUpload}/>
                                <FormText color="muted">
                                    Upload your json file here..
                                </FormText>
                                <hr className="my-2" />
                                <Button block className="button1" onClick={this.toggle}>IMPORT WALLET</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Input Wallet Password</ModalHeader>
                <ModalBody>
                    <Input type="password" name="openPassword" id="openPassword" placeholder="password" onChange={this.handleInput}/>
                </ModalBody>
                <ModalFooter>
                    <Button className='button1' onClick={this.decryptWallet}>Submit</Button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}
 
export default withRouter(CreateWalletComponent);