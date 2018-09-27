import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {firebase, databaseCollection} from './../firebase.js'
import {ethers, provider} from './../helpers/ethers-config'
import {address, abi} from './../config'
import EthereumClient from './../models/EthereumClient'

class NavigatorContent extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      user:{      
        hasRegistered: false
      },
    };
    this.handleLogout = this.handleLogout.bind(this)
    this.getUser = this.getUser.bind(this)
    this.hasRegistered = this.hasRegistered.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (user)=>{
        if (user) {
            const userData = await this.getUser(user.uid)
            this.setState({user: {...userData, ...this.state.user}})
            await this.hasRegistered()
        } else {
            this.setState({user:null})
        }
    })
  }
  async handleLogout () {
    await firebase.auth().signOut()
    sessionStorage.clear()
  }
  async getUser (id) {
    try {
      const docRef = await databaseCollection('users').doc(id).get()
      if (docRef.exists) {
        return { id, ...docRef.data() }
      }
      return null
    } catch (error) {
      return error
    }
  }

  async hasRegistered () {
    console.log(this.state.user.hasRegistered)
    const jsonwallet = sessionStorage.getItem("jsonwallet")
    let client = new EthereumClient()
    const decryptedWallet = await client.decryptWallet(jsonwallet, 'test')
    this.setState({decryptedWallet})
    const ethWall = new ethers.Wallet(decryptedWallet.privateKey, provider)
    const contract =  new ethers.Contract(address, abi, ethWall)
    const  validity = await contract.validToRegister()
    this.setState({user:{
      ...this.state.user,
      hasRegistered: validity
    }})
  }

  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand><p id="logo">Promoto</p></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/">|  Home  |</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              { this.state.user && `${this.state.user.firstName} ${this.state.user.lastName}` }
              </DropdownToggle>
              <DropdownMenu right>
              {this.state.user.hasRegistered ||
                 <DropdownItem>
                 <Link to='/register-artist' >Register as artist</Link>
               </DropdownItem>
              }
               
                <DropdownItem>
                  <Link to='/wallet'>Wallet</Link>      
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          </Collapse>
        </Navbar>
      </div>  
    );
  }
}

export default NavigatorContent