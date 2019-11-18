import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { HeaderDesktop } from "./HeaderDesktop";
import { FlyoutMenu } from "./FlyoutMenu";
import Logo from "../logo.svg";

export const Header = props => {
  const { account } = props;
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      className="main"
    >
      <Nav>
        <FlyoutMenu />
      </Nav>
      <Navbar.Brand>
        <img src={Logo} alt="" height="25em" width="75em"></img>
      </Navbar.Brand>
      <Nav className="mobile">
        <NavDropdown
          title={<FontAwesomeIcon icon={faUserCircle} />}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#">{account}</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <HeaderDesktop account={account} />
    </Navbar>
  );
};
