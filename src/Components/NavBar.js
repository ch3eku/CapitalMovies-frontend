import React, { Component } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css'

export default class NavBar extends Component {


    render() {

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
                                <Link className='link' to="/discover/favourite">Favourites</Link>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            <Link className='link' to="/user/signup">Signup</Link>
                            <Link className='link' to="/user/login">Login</Link>
                            <Link className='link' to="/user/logout">Logout</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
