import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

class ListRow extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    symbol: PropTypes.string,
  }
  render() {
    const { title, symbol } = this.props
    const symbolVal = symbol.codePointAt(0).toString(16)
    const src = `//cdn.jsdelivr.net/emojione/assets/png/${symbolVal}.png`
    return (
      <div
        className="component-emoji-result-row listRow"
        data-clipboard-text={symbol}
      >
        <img src={src} alt={title} />
        <span className="title">{title}</span>
        <span className="info">Click to copy emoji</span>
      </div>
    )
  }
}

export default ListRow
