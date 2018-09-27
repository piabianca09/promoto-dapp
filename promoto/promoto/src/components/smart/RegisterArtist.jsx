import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import {ethers, provider, ipfs} from './../../helpers/ethers-config'
import {address, abi} from './../../config'
import EthereumClient from './../../models/EthereumClient'

class RegisterArtistComponent extends Component {
    constructor (props) {
        super (props)
        this.state = { }
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
        const decryptedWallet = await client.decryptWallet(jsonwallet, 'test')
        this.setState({decryptedWallet})
        const wallet = new ethers.Wallet(decryptedWallet.privateKey, provider)
        const contract = new ethers.Contract(address,abi,wallet)        
        await contract.registerArtist(artist.username, 'sdf', 'dfd', artistIpfs[0].hash)
        console.log(artistIpfs[0].hash)
    }

    render() {  
        const types = ['Singer','Painter', 'Musician', 'Sculptures', 'Photography', 'Architecture', 'Fashion Design', 'Crafts', 'Interior Design', 'Dancer']
        return ( 
            <Container className="app-container">
                <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                        <h1 className="display-5">Be an artist</h1>
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="username" className="mr-sm-2">Username</Label>
                                <Input type="text" name="username" id="username" onChange={this.handleInput} value={this.state.username}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="type">Type</Label>
                                <Input type="select" name="type" id="type" onChange={this.handleInput} value={this.state.type}>
                                    {
                                        types.map((t, i) => <option key={i}>{t}</option>)
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" id="description" className="textarea-desc" onChange={this.handleInput} value={this.state.description}/>
                            </FormGroup>
                            <FormGroup>
                            <Label for="exampleFile">Upload picture</Label>
                                <Input type="file" name="file" id="file" onChange={this.getFile}/>
                            </FormGroup> 
                            <hr className="my-2" />
                            <Button block className="button1" onClick={this.uploadImage}>Submit</Button>
                        </Form>
                    </Col>
                    <Col xs="2" sm="2"></Col>
                </Row>
            </Container>
        );
    }
}

export default RegisterArtistComponent;