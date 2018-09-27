import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import {ethers, provider, ipfs} from './../../helpers/ethers-config'
import {address, abi} from './../../config'
import EthereumClient from './../../models/EthereumClient'
import RegisterArtist from './../dumb/RegisterArtist'

class RegisterArtistComponent extends Component {
    constructor (props) {
        super (props)
        this.state = { 
            hasRegistered: false,
         }
        this.getFile = this.getFile.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event) {
        const {id, value} = event.target 
        this.setState({[id]: value})
    }

    async getFile(event) {
        const file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async () => {
            const buffer = await this.convertToBuffer(reader)
            this.setState({buffer})
        }
    }

    async convertToBuffer(reader) {
        return await Buffer.from(reader.result)
    }

    async uploadImage() {
        const results = await ipfs.add(this.state.buffer)
        const artist = {
            username: this.state.username,
            imageHash: results[0].hash
        }
        const artistjson = JSON.stringify(artist)
        const bufferArtist = await Buffer.from(artistjson)
        const artistIpfs = await ipfs.add(bufferArtist)
        const jsonwallet = sessionStorage.getItem("jsonwallet")
        let client = new EthereumClient()
        const decryptedWallet = await client.decryptWallet(jsonwallet, '123')
        this.setState({decryptedWallet})
        const wallet = new ethers.Wallet(decryptedWallet.privateKey, provider)
        const contract = new ethers.Contract(address,abi,wallet)    
        const artistType = this.state.artistType
        const description = this.state.description    
        await contract.registerArtist(artist.username, artistType, description, artistIpfs[0].hash)
        console.log(artistIpfs[0].hash)
    }


    render() {  
        return ( 
            <Container className="app-container">
                <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                        <h1 className="display-5">Be an artist</h1>
                        <RegisterArtist
                            values={this.state}
                            handleInput={this.handleInput}
                            uploadImage={this.uploadImage}
                            getFile={this.getFile}
                        />
                    </Col>
                    <Col xs="2" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}

export default RegisterArtistComponent;