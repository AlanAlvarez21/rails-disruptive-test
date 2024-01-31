import React from 'react'
import { Link } from "react-router-dom"

function NavBar() {
  return(
  <nav>
    <Link to="/">Currency Links</Link>
    { " | " }
    <Link to="/new">New Currency</Link>
  </nav>
  );
}


export default NavBar