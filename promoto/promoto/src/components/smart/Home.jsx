import React, { Component } from 'react';
import {firebase} from './../../firebase.js'
import {Button} from 'reactstrap'
import {address, abi} from './../../config'
import {ethers, provider} from './../../helpers/ethers-config'

class HomeComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {  }
        this.getArtistsCount = this.getArtistsCount.bind(this)
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.setState({user}) 
            } else {
                this.setState({user:null})
            }
        })
    }
    
    async getArtistsCount() {
        const contract =  new ethers.Contract(address, abi, provider)
        const artistsCount = await contract.getNumberOfArtists()
        console.log(artistsCount.toNumber())
    }
    
    render() { 
        return ( 
            <div>
                This is home
                <Button onClick={this.getArtistsCount}>Buttoon</Button>
            </div>
         );
    }
}
 
export default HomeComponent;
