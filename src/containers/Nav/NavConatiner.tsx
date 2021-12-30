import React from 'react'
import { Link } from 'react-router-dom'

const NavConatiner = function () {
 return (
  <div>
   <nav>
    <Link to="/">Home</Link> | <Link to="about">About</Link> | <Link to="count">Count</Link>
   </nav>
  </div>
 )
}

export default NavConatiner
