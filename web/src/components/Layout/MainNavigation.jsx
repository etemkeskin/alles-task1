import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

const MainNavigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink to="/">Home </NavLink>
          </Nav.Link>
          <Nav.Link></Nav.Link>
          <Nav.Link>
            <NavLink to="/tickets">My Tickets</NavLink>
          </Nav.Link>
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          { localStorage.getItem('name') == null && <NavLink to="/login">Login</NavLink>}
          { localStorage.getItem('role') === 'customer' && <NavLink>{localStorage.getItem('name')}</NavLink>}
        </Navbar.Collapse>
      </Container>
      <Outlet />
    </Navbar>
  );
};

export default MainNavigation;
