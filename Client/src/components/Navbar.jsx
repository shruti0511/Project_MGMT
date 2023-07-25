import React from 'react'
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const HorizontalNavbar = () => {
  return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand ><Link to='/' style={{textDecoration:'none',color:'inherit'}}>Project MGMT</Link></Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      </>
  )
}

export default HorizontalNavbar