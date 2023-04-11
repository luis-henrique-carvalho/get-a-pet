import { useContext } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/img/logo.png";
import { Nav } from "../../styles";

// context
import { Context } from "../../context/UserContext";

const NavBar = () => {
  const { authenticated, logout } = useContext(Context);
  return (
    <Nav>
      <div className="navbar_logo">
        <img src={Logo} alt="" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li>
              <Link to="/pet/mypets">My Pets</Link>
            </li>
            <li>
              <Link to="/pet/add">Add Pets</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Cadastro</Link>
            </li>
          </>
        )}
      </ul>
    </Nav>
  );
};

export default NavBar;
