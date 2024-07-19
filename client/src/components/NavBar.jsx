import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Forum">Forum</Link>
        </li>
        <li>
          <Link to="/Registrazione">Registrazione</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Account">Account</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
