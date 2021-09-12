import React, { Component } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css'

export default class NavBar extends Component {

    logoutHandler = () => {
        sessionStorage.clear();
        this.props.setUser(null);
    }

    render() {

        let userLinks;
        if (this.props.user) {
            userLinks = (
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <Link className='link' to="">Welcome {this.props.user.username}</Link>
                    <Link className='link' to="/" onClick={this.logoutHandler}>Logout</Link>
                </div>
            )
        } else {
            userLinks = (
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <Link className='link' to="/user/signup">Signup</Link>
                    <Link className='link' to="/user/login">Login</Link>
                </div>
            )
        }

        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Capital Movies</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className='link' to="/">Home</Link>
                            <NavDropdown className='dropdown' title="Discover Movies" id="basic-nav-dropdown">
                                <Link className='link' to="/discover/popular">Popular</Link>
                                <Link className='link' to="/discover/latest">Latest</Link>
                                {(this.props.user)
                                    ? <Link className='link' to="/discover/favourite">Favourites</Link>
                                    : null
                                }
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            {userLinks}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
