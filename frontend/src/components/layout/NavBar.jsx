import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/logo.png";
import { Nav } from "../../styles";

const NavBar = () => {
  return (
    <Nav>
      <div className="navbar_logo">
        <img src={Logo} alt="" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/Register">Cadastro</Link>
        </li>
      </ul>
    </Nav>
  );
};

export default NavBar;
