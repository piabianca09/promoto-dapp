import React, { Component } from 'react';
import {firebase} from './../../firebase.js'
import {Row, Col, Button, Container, Card, CardImg, CardText, CardBody,
    CardTitle, Modal, ModalBody, ModalHeader, ModalFooter, Input} from 'reactstrap'
import {address, abi} from './../../config'
import {ethers, provider} from './../../helpers/ethers-config'
import axios from 'axios'
import {Link} from 'react-router-dom'
import EthereumClient from './../../models/EthereumClient'

class HomeComponent extends Component {
    constructor (props) {
        super(props)
        this.state = { data:[], hasDisplayed:false, modal: false }
        this.getArtistsCount = this.getArtistsCount.bind(this)
        this.getArtist = this.getArtist.bind(this)
        this.toggle = this.toggle.bind(this)
        this.subscribeToArtist = this.subscribeToArtist.bind(this)
        this.selectOption = this.subscribeToArtist.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }
    async componentDidMount() {
        firebase.auth().onAuthStateChanged( async (user)=>{
            if (user) {
                this.setState({user}) 
            } else {
                this.setState({user:null})
            }
        })
        if(!this.state.hasDisplayed){
            await this.getArtist()
        }
    }
    
    toggle(item) {
        this.setState({
          modal: !this.state.modal,
          item
        });
    }

    handleInput(event) {
        const {id, value} = event.target 
        this.setState({[id]: value})
    }

    async getArtistsCount() {
        const contract =  new ethers.Contract(address, abi, provider)
        const artistsCount = await contract.getNumberOfArtists()
        const artistsNumber = artistsCount.toNumber()
        this.setState({artistsNumber})
    }      
            
    async getArtist() {
        const contract =  new ethers.Contract(address, abi, provider)
        await this.getArtistsCount()
        const artistsCount = await this.state.artistsNumber
        let data = []
        for (let i = 0; i < artistsCount; i++) {
            const [name, description, ipfs, subscribersCount, artistAdd] = await contract.getArtist(i)
            const ipfsValue = await axios.get(`https://gateway.ipfs.io/ipfs/${ipfs}`)
            const value = {name, description, ipfs, subscribersCount: subscribersCount.toNumber(), artistAdd, ...ipfsValue.data }
            data.push(value)
        }
        this.setState({data, hasDisplayed: true})
    }
    
    async subscribeToArtist () {
        try {
            const jsonwallet = sessionStorage.getItem("jsonwallet")
            const item = this.state.item
            let client = new EthereumClient()
            const walletPassword = this.state.walletPassword
            const decryptedWallet = await client.decryptWallet(jsonwallet, walletPassword)
            this.setState({decryptedWallet})
            const wallet = new ethers.Wallet(decryptedWallet.privateKey, provider)
            const contract = new ethers.Contract(address,abi,wallet)  
            console.log(this.state.amount)
  
            const overide = {
                value: ethers.utils.parseEther(`${this.state.amount}`),
                // gasLimit: 2000000,
                // gasPrice: 25
            }
            const res = await contract.pay(item.artistAdd, overide)
        } catch (err) {
        }
    }

    selectOption1 (amount) {
        this.setState({amount})
        document.getElementById('option1').style.background = "#d57897"
        console.log(amount)
    }

    selectOption2 (amount) {
        this.setState({amount})
        document.getElementById('option2').style.background = "#d57897"
        console.log(amount)

    }


    selectOption3 (amount) {
        this.setState({amount})
        document.getElementById('option3').style.background = "#d57897"
        console.log(amount)

    }


    render() { 
        let artist = () => this.state.data.map((item, i) => (
            <div style={{paddingBottom:'5vh'} } key={i}>
                <Card>
                    <CardImg top width="100%" src={`https://gateway.ipfs.io/ipfs/${item.imageHash}`} alt="Card image cap" />
                    <CardBody>
                    <CardTitle>{item.username}</CardTitle>
                    <CardText>{item.description}</CardText>
                    <CardText>{item.subscribersCount} Subscribers</CardText>
                    <Button color='gray' block onClick={() => this.toggle({...item,i })}>Subscribe</Button>
                    </CardBody>
                </Card>
            </div>
            )
        )
        return ( 
            <div>
                <Row>
                    <Col xs="1" sm="2"></Col>
                    <Col xs="8" sm="8">
                    <div>
                        <Container>
                            <div className="plate">
                                <p className="script"><span>The Real Artists</span></p>
                                <p className="display-4">{`Total of ${this.state.artistsNumber} artists`}</p>
                                <Link to='/register-artist'> <p className="shadow text1">START MY PAGE</p> </Link>
                                <p className="script"><span>by Pia</span></p>
                            </div>
                        </Container>
                    </div>
                    {this.state.data.length && artist()}
                    </Col>
                    <Col xs="1" sm="2"></Col>
                </Row>
                { this.state.item &&
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={{width:'100vh'}}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <p className='dispaly-2'>Become a subscriber of</p>
                        <p className='display-4'> {this.state.item.name} </p>
                        <Container>
                            <Row>
                                <Col xs="6" sm="4">
                                    <Card body>
                                        <CardTitle>$1 PER WEEK</CardTitle>
                                        <CardText>
                                            Thank you! <br/> You can get: <br/> All weekly pictures (10+) with undersketches and more!
                                        </CardText>
                                        <br/> <br/> <br/> <br/>
                                        <Button id='option1' style={{background:'gray'}} block onClick={() =>this.selectOption1(0.1)}>CHOOSE  </Button>
                                    </Card>                                
                                </Col>
                                <Col xs="6" sm="4">
                                    <Card body>
                                        <CardTitle>$5 PER WEEK</CardTitle>
                                        <CardText>
                                            Thank you! <br/> You can get: <br/> All weekly pictures (10+) with undersketches and more! PSDs and full-sizes!
                                        </CardText>
                                        <br/>
                                        <br/>
                                        <Button  id='option2' style={{background:'gray'}} block onClick={() => this.selectOption2(0.3)}>CHOOSE  </Button>
                                    </Card>                                
                                </Col>
                                <Col xs="6" sm="4">
                                    <Card body>
                                        <CardTitle>$10 PER WEEK</CardTitle>
                                        <CardText>
                                            Thank you! <br/> You can get: <br/> All weekly pictures (10+) with undersketches and more! PSDs and full-sizes! Process videos!
                                        </CardText>
                                        <Button id='option3' style={{background:'gray'}} block onClick={() => this.selectOption3(0.5)}>CHOOSE  </Button>
                                    </Card>
                                </Col>
                                Input your wallet password here:
                                <Input type="password" name="walletPassword" id="walletPassword"  onChange={this.handleInput} value={this.state.walletPassword}/>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>Close</Button>
                        <Button className='button1' onClick={this.subscribeToArtist}>Subscribe</Button>
                    </ModalFooter>
                </Modal>
                }
            </div>
         );
    }
}
 
export default HomeComponent;
