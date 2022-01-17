import React from 'react'
import { Link } from 'react-router-dom'

const NavConatiner = function () {
 return (
  <div>
   <nav>
    <Link to="/">Home</Link> | <Link to="about">About</Link> | <Link to="count">Count</Link> | <Link to="d3">D3</Link> | <Link to="upbit">upbit</Link> |{' '}
    <Link to="learn">Learn d3</Link>
   </nav>
  </div>
 )
}

export default NavConatiner
