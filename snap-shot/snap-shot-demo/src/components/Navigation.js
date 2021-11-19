import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="main-nav">
      <ul>
        <li>
          <NavLink to="/search/mountain">Mountain</NavLink>
        </li>
        <li>
          <NavLink to="/search/birds">Birds</NavLink>
        </li>
        <li>
          <NavLink to="/search/beaches">Beaches</NavLink>
        </li>
        <li>
          <NavLink to="/search/food">Food</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
