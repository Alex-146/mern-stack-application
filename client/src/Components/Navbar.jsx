
import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/auth";

function Navbar() {
  
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
    history.push("/");
  }

  return (
    <nav>
      <ul>
        <li><NavLink to="/create">Create</NavLink></li>
        <li><NavLink to="/promocode">Promocode</NavLink></li>
        <li><a href="/" onClick={logoutHandler}>Logout</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
