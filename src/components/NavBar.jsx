import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="App">
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Pilar Tecno - React</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link className="nav-link" to="/">Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/Countries">Countries</Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/Cities">Cities</Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/Companies">Companies</Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/Jobs">Job positions</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
        </div>
    )
}

export default NavBar;