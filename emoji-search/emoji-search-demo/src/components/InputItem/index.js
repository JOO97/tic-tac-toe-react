import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

class InputItem extends React.Component {
  static propTypes = {
    valueChange: PropTypes.func,
  }

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input
            type="text"
            onChange={(e) => {
              this.props.valueChange(e)
            }}
          />
        </div>
      </div>
    )
  }
}

export default InputItem
