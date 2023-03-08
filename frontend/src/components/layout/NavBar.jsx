import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'

const NavBar = () => {
  return (
    <nav>
      <div>
        <img src={Logo} alt="" />
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/Register'>Cadastro</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar