import React from 'react'

import SearchBar from './SearchBar'
import Navigation from './Navigation'

const Header = ({ handleSubmit, history }) => {
  return (
    <div>
      <h1>SnapShot</h1>
      <SearchBar handleSubmit={handleSubmit} history={history} />
      <Navigation />
    </div>
  )
}

export default Header
