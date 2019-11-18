import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const HeaderDesktop = props => {
  const { account } = props;
  return (
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/artists">
          <Nav.Link>Artists</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/register">
          <Nav.Link>Register</Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav>
        <Nav.Link href="#/search">{account}</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );
};
