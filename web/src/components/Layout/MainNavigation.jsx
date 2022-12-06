import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import { Container, Navbar, Nav} from "react-bootstrap";

const MainNavigation = () => {
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink to="/">Home </NavLink>
          </Nav.Link>
          <Nav.Link></Nav.Link>
          {localStorage.getItem("role") === "customer" && (
            <Nav.Link>
              <NavLink to="/tickets">My Tickets</NavLink>
            </Nav.Link>
          )}
          {localStorage.getItem("role") === "admin" && (
            <Nav.Link>
              <NavLink to="/admin/tickets">Tickets</NavLink>
            </Nav.Link>
          )}
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          {localStorage.getItem("role") === "customer" && (
            <Nav.Item style={{ color: "#eee" }}>
              {localStorage.getItem("name")} |
            </Nav.Item>
          )}
          {localStorage.getItem("role") === "admin" && (
            <Nav.Item style={{ color: "#eee" }}>
              {localStorage.getItem("name")} |
            </Nav.Item>
          )}
          {localStorage.getItem("name") != null && (
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          )}

          {localStorage.getItem("name") == null && (
            <NavLink to="/login">Login</NavLink>
          )}
        </Navbar.Collapse>
      </Container>
      <Outlet />
    </Navbar>
  );
};

export default MainNavigation;
