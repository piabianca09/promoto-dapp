import React from 'react';
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

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      user:{}
    };
    this.handleLogout = this.handleLogout.bind(this)
    this.getUser = this.getUser.bind(this)
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
            console.log(userData);
            this.setState({user: userData}) 
        } else {
            this.setState({user:null})
        }
    })
  }
  async handleLogout () {
    await firebase.auth().signOut()
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
  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand><p id="logo">Promoto</p></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              { this.state.user && `${this.state.user.firstName} ${this.state.user.lastName}` }
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to='/register-artist'>Register as artist</Link>
                </DropdownItem>
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