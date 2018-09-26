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
  DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {firebase, databaseCollection} from './../firebase.js'

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    };
    this.handleLogout = this.handleLogout.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  async handleLogout () {
    await firebase.auth().signOut()
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Promoto</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    User
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  <DropdownItem>
                    <Link to='/create-wallet'>Wallet</Link>
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