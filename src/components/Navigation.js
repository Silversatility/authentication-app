import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };

    checkAuth();

    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        {isAuth ? <Nav.Link as={Link} to="/">Home</Nav.Link> : null}
      </Nav>
      <Nav>
        {isAuth ? (
          <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
