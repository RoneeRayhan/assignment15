import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const AppNavBar = () => {
    return (
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">MERN APP</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">List</NavLink>
                        <NavLink className="nav-link" to="/save">Save</NavLink>
                    </Nav>
                </Container>
            </Navbar>
    );
};

export default AppNavBar;