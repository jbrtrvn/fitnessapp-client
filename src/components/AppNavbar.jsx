import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('User in AppNavbar:', user); // Debugging
  }, [user]);

  return (
    <Navbar expand="lg" className="bg-primary p-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white fs-2">
          Fitness App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && user.id ? (
              <>
                <Nav.Link as={NavLink} to="/workouts" className="text-white fs-4">
                  Workouts
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/logout"
                  className="text-white fs-4"
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="text-white fs-4 me-3">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="text-white fs-4">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
