import React, { Component } from 'react';
import {firebase} from './../../firebase.js'
import {Row, Col, Button, Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap'
import {address, abi} from './../../config'
import {ethers, provider} from './../../helpers/ethers-config'
import axios from 'axios'
import {Link} from 'react-router-dom'

class HomeComponent extends Component {
    constructor (props) {
        super(props)
        this.state = { data:[] }
        this.getArtistsCount = this.getArtistsCount.bind(this)
        this.getArtist = this.getArtist.bind(this)
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.setState({user}) 
                this.getArtistsCount()
            } else {
                this.setState({user:null})
            }
        })
    }
    
    async getArtistsCount() {
        const contract =  new ethers.Contract(address, abi, provider)
        const artistsCount = await contract.getNumberOfArtists()
        const artistsNumber = artistsCount.toNumber()
        this.setState({artistsNumber})
    }      
            
    async getArtist() {
        const contract =  new ethers.Contract(address, abi, provider)
        const artistsCount = await this.state.artistsNumber
        let data = []
        for (let i = 0; i < artistsCount; i++) {
            const [name, artistType, description, ipfs, subscribersCount] = await contract.getArtist(i)
            const ipfsValue = await axios.get(`https://gateway.ipfs.io/ipfs/${ipfs}`)
            const value = {name, artistType, description, ipfs, subscribersCount: subscribersCount.toNumber(), ...ipfsValue.data}
            data.push(value)
        }
        this.setState({data})
    }
    

    render() { 
        let artist = () => this.state.data.map((item, i) => (
            <div style={{paddingBottom:'5vh'} } key={i}>
                <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                    <CardTitle>{item.username}</CardTitle>
                    <CardSubtitle>{item.artistType}</CardSubtitle>
                    <CardText>{item.description}</CardText>
                    <Button>Subscribe</Button>
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
                        <Button onClick={this.getArtist}> </Button>
                    </div>
                    {this.state.data.length && artist()}
                    </Col>
                    <Col xs="1" sm="2"></Col>
                </Row>
            </div>
         );
    }
}
 
export default HomeComponent;
